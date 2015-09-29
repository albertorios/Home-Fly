Template.admin.onRendered(function(){

});
Template.admin.helpers({

});
Template.admin.events({
  'click #search-button':function(){
    var search_query = document.getElementById('search_query').value;
    if (search_query == '' || search_query == null || search_query == undefined) {
    }
    else{
      Meteor.call('place',search_query,function(err,result){
        Session.set('user_address', result);
      });
      Router.go('/results');
    }
  },
  'keyup #search_query':function(e){
    if (e.keyCode === 13) {
      $('#search-button').trigger('click');
     }
  }
});
