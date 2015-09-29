Router.route('/twilio/sms', { where: 'server' })
  .get(function () {
  })
  .post(function () {
    var rawIn = this.request.body;
    var res = this.response;
    console.log(rawIn.Body);
    var sms_received = {};
    var xmlData = '<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Sms>';
    if (rawIn.Body) {
       sms_received.text = rawIn.Body;
     } else {
       var xmlData = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>';
       xmlData += '<Response><Sms>it dun fucked up</Sms></Response>';
       res.writeHead(200, {'Content-Type': 'application/xml'});
       res.end(xmlData);
     }
     var split_text = sms_received.text.split(",");
     for(i =0; i< split_text.length;i++){
       var args = split_text[i].split(":");
       if(args[0] == 'address' || args[0] == 'Address'){
         var user_location = Meteor.call('place',args[1]);
         var closest_shelter = Meteor.call('find_nearby',user_location);
         xmlData +="Name: " + closest_shelter[0]['Name']+'\n';
         xmlData +=" Address: " + closest_shelter[0]['Address']+'\n';
         xmlData +=" Available Beds: " + closest_shelter[0]['Beds']+'\n';
         xmlData +=" Telephone: " + closest_shelter[0]['Number']+'\n';
         xmlData +=" Distance: " + closest_shelter[0]['Distance']+' mi\n';
         xmlData +=" Residents: " + closest_shelter[0]['Tag']+'\n';


       }
       else{
         xmlData+='unknown command';
       }
     }
     xmlData +='</Sms></Response>';
     res.writeHead(200, {'Content-Type': 'application/xml'});
     res.end(xmlData);
  })
  .put(function () {
  })
