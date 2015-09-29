Template.playground.onRendered(function(){
  //service = new google.maps.places.PlacesService();
  var loc_1 = "1414 East 59th Street Chicago, IL";
  var loc_2 =   Meteor.call('place',"His Glory Christian Outreach Belvidere IL",function(err,result){
    /**Meteor.call('distance',loc_1,result,function(e,res){
      //console.log(res);
    });*/
  });

  // "res" is the array of sorted shelters within 10 miles
  Meteor.call('getNearestShelters',loc_1,function(e,res) {
  	var output = "";
  	for (i = 0; i < res.length; i++) {
  		output = output + "Nearest shelter is: " + res[i]['Name'] + "<br>";
  		output = output + "It's address is: " + res[i]['Address'] + "<br>";
  		var destAddress = res[i]['Address'] + res[i]['City'] + res[i]['State'];
  		var miles;
  		Meteor.call('distance',loc_1,destAddress,function(e,res2) {
  			miles = parseFloat(res2.distance.slice(0, -3).replace(/,/g, ''));
  			miles = miles * .621371;
  			console.log(miles);
  		});
  		output = output + "It is " + miles + " miles away.<br>";
  	}
  	var element = document.getElementById("testText");
  	element.innerHTML = output;
  	//alert("Nearest shelter is: " + res[0]['Name']);
  	//alert("It's address is: " + res[0]['Address']);
  	
  });
});
Template.playground.helpers({
  locate:function(){
  }
});
Template.playground.events({

});
