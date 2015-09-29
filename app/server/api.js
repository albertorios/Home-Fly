//SERVER KEY: AIzaSyD3YL6SBUqRyrrqaK-C2QHjfV4-DtgrLHA
Meteor.methods({
  twilio_response:function(send_to,response_body){
    var account_sid = 'AC70183eeddac9f1515768fb0cb90f0926';
    var from_num = '+16304739723';
    try {
      var results = HTTP.post("https://api.twilio.com/2010-04-01/Accounts/"+ account_sid+ "/Messages",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            From : from_num,
            To : send_to,
            Body: response_body
          }
        }
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  distance:function(loc_1,loc_2){
    var api_key = 'AIzaSyANtcWy0FRioY_i5csEp28yIEkVYzvthdQ';//'AIzaSyDZm0476jfTahc-cWB11agiPxmsQNgb9G0';
    try {
      var results = HTTP.get("https://maps.googleapis.com/maps/api/distancematrix/json",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            origins : loc_1,
            destinations : loc_2,
            key : api_key,
            mode : 'walking'
          }
        }
      );
      var res = {};
      res['distance'] = results['data']['rows'][0]['elements'][0]['distance']['text'];
      res['duration'] = results['data']['rows'][0]['elements'][0]['duration']['text'];
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  place:function(place_text){
    var api_key = 'AIzaSyANtcWy0FRioY_i5csEp28yIEkVYzvthdQ';//'AIzaSyDZm0476jfTahc-cWB11agiPxmsQNgb9G0';
    try {
      var results = HTTP.get("https://maps.googleapis.com/maps/api/place/textsearch/json",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params : {
            query: place_text,
            key : api_key
          }
        }
      );
      var res = results['data']['results'][0]['formatted_address'];
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**place:function(place_text){
    var api_key = 'AIzaSyD3YL6SBUqRyrrqaK-C2QHjfV4-DtgrLHA';
    try {
      var results = HTTP.get("https://maps.googleapis.com/maps/api/place/textsearch/json",
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params : {
            query: place_text,
            key : api_key
          }
        }
      );
      var res = results['data']['results'][0]['formatted_address'];
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  },*/
});
  // shelterExists:function(shelterAddress) {
  // 	var exists = false;
  // 	shelters.forEach(function (shelter) {
  // 		if (shelter.Address == shelterAddress) {
  // 			exists = true;
  // 		}
  // 	});
  //
  // 	return exists;
  // },
  //
  // // Return a shelter based off of the input address
  // getShelterByAddress:function(address) {
  // 	var retShelter;
  // 	shelters.forEach(function (shelter) {
  // 		if (shelter.Address == address) {
  // 			retShelter = shelter;
  // 		}
  // 	});
  // 	if (retShelter == null) {
  // 		alert("Shelter not found from address");
  // 	} else {
  // 		return retShelter;
  // 	}
  //
  // },
  //
