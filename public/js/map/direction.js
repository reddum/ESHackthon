export default class Directions{
  constructor(map,color){
    this.service = new google.maps.DirectionsService;
    this.display = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: color
      }
    });
    this.display.setMap(map.googleMap);
    this.findPath = this.findPath.bind(this);
    this.clearPath = this.clearPath.bind(this);
  }

  findPath(origin,destination,callback){
    this.service.route({
      origin: origin,
      destination: destination,
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        this.display.setDirections(response);
        callback();
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }.bind(this));
  }

  clearPath(){
    this.display.setDirections({routes: []});
  }
}