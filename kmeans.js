var underscore = require('underscore');
var math_module = require('mathjs');

var MAX_LOOPS = 15;

var shelter_lat_lon = [[1,1],[2,2],[4,4],[100,100],[16,16],[12,12],[79,79],[7,8],[15,12],[14,20],[9,27]];

var distance = function (a,b) {
  return Math.sqrt(Math.pow((a[0] - b[0]),2) + Math.pow((a[1] - b[1]),2))
}

var smallest_index = function (array) {
  return array.indexOf(Math.min.apply(Math,array));
}

var k_means = function (array,number_clusters,max_loops) {
  var initial_centers = underscore.sample(array,number_clusters);
  console.log(initial_centers)
  var current_centers = initial_centers;

  var current_associations = {};
  for (p = 0; p < current_centers.length; p++) {
      current_associations[current_centers[p]] = []
  }

  for (loops = 0; loops < max_loops; loops++) {
    for (var i = 0; i < array.length; i++) {
      var current_loc = array[i]
      temp_array = new Array();
      for (var j = 0; j < current_centers.length; j++) {
        var distance_from_center = distance(current_centers[j],current_loc)
        temp_array.push(distance_from_center)
      }
      var closest_center_lat_lon = current_centers[smallest_index(temp_array)]
      current_associations[closest_center_lat_lon].push(current_loc)
    }
    new_clusters_temp = []
    for (var key in current_associations) {
      lat = []
      lon = []
      for (var p = 0; p < current_associations[key].length; p++){
        lat.push(current_associations[key][p][0])
        lon.push(current_associations[key][p][1])
      }
      mean_lat = math_module.mean(lat)
      mean_lon = math_module.mean(lon)
      new_clusters_temp.push([mean_lat,mean_lon])
    }
    current_centers = new_clusters_temp;
    console.log(current_centers)
  }
  return current_centers
}

k_means(shelter_lat_lon,5,MAX_LOOPS)
