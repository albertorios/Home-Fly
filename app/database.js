SHELTER = new Mongo.Collection('shelter');
var shelters = SHELTER.find();

Meteor.methods({
  
  // Returns all shelters within 10 miles of the user's input address
   getNearestShelters:function(userAddress) {
   	var nearestShelters = [];
   	var distances = [];

   	shelters.forEach(function (shelter) {		
   		var currAddress;
   		if (shelter['Address'] != '') {
   			currAddress = shelter['Address'] + shelter['City'] + shelter['State'];
   		}

   		if (currAddress != null) {
   			var dist = "";
   			Meteor.call('distance',userAddress,currAddress,function(e,res){
   				dist = res.distance.slice(0, -3);
    		});
    		if ((parseFloat(dist.replace(/,/g, ''))) < 16.0934) {
   				nearestShelters.push(shelter);
   				distances.push(parseFloat(dist.replace(/,/g, '')));
   			}
   		}5
   	});
   	
   	// Sort the array
   	Meteor.call('sortArray', nearestShelters, distances, function(e,res) {
   		nearestShelters = res;
   	});

   	return nearestShelters;
   },

   // Sorts the array of shelters
   sortArray:function(sheltersArr, distancesArr) {
   	var sortedArr = [];
   	console.log("Length of shelters: " + sheltersArr.length);
   	var smallestIndex= 0;
   	for (i = 0; i < distancesArr.length; i++) {
   		for (j = 0; j < distancesArr.length; j++) {
   			if (distancesArr[j] < distancesArr[smallestIndex]) {
   				smallestIndex = j;
   			}
   		}
   		sortedArr.push(sheltersArr[smallestIndex]);
   		distancesArr[smallestIndex] = 999999999;
   		smallestIndex = 0;
   	}

   	return sortedArr;
   },
});