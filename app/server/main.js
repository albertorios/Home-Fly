Meteor.startup(function () {
  if(SHELTER.find().count() == 0){
    console.log('Building database...');
    var sh = JSON.parse(Assets.getText('shelter.json'));
    _.each(sh['shelters'],function(doc){
      SHELTER.insert(doc);
    })
    console.log('Finished building shelter database');
  }
});
Meteor.methods({

});
