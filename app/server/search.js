Meteor.methods({
  find_nearby:function(userAddress){
    var shelter_list = SHELTER.find();
    var results = [];
    shelter_list.forEach(function (shelter) {
      var shelter_address = '';
      if (shelter['Address'] != '') {
        shelter_address = shelter['Address']+ ' ' + shelter['City'] + ' '+ shelter['State'];
        var dist = Meteor.call('distance',userAddress,shelter_address).distance.slice(0, -3);
        dist = parseFloat(dist.replace(/,/g, ''));
        if (dist < 16.0934) {
          shelter['Distance'] = (dist*.6213).toFixed(2);
          results.push(shelter);
        }
      }
    });
    function compare(a,b) {
      if (a['Distance'] < b['Distance'])
        return -1;
      if (a['Distance'] > b['Distance'])
        return 1;
      return 0;
    }
    results.sort(compare);
    return results;
  },
  change_tag:function(shelter_id,tag){

  },
  change_bed_num:function(shelter_id,bed_num){

  }
});
