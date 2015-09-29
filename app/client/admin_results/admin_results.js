Template.admin_results.onRendered(function(){
  // Meteor.call('find_nearby',Session.get('user_address'),function(err,result){
  //   console.log(result);
  // });
});
Template.admin_results.helpers({
  u_address:function(){
    var user_address = Session.get('user_address');
    if(user_address != null || user_address != '' ){
      Meteor.call('find_nearby',user_address,function(err,result){
        console.log(result);
        Session.set('nearby_shelter_list', result);
      });
    }
  },
  shelterz:function(){
    var shelter_list = Session.get('nearby_shelter_list');
    if(shelter_list != null){
      document.getElementById('resultz').style.visibility="visible";
      console.log(shelter_list);
      return shelter_list;
    }
    else{
      return false;
    }
  },
  activate_drop:function(){
    $('.ui.accordion').accordion();
  }
});
Template.admin_results.events({
});
