import Person from './person'
import Directions from './direction'
import Bike from './bike'

export default class Map{

  constructor(){
    this.target = -1;
    this.mapOptions = {
      center: { lat: 24.792081, lng: 120.992631},
      zoom: 18,
      disableDefaultUI: true
    };
    this.rubikes = [];
    this.googleMap = new google.maps.Map(
      document.getElementById('googleMapDiv'),
    this.mapOptions);;
    this.person = new Person(this);
    this.bikeDirections = new Directions(this,'blue');
    this.placeDirections = new Directions(this,'red');
    this.lockMove = this.lockMove.bind(this);
    this.unLockMove = this.unLockMove.bind(this);
    this.setOriginLocation = this.setOriginLocation.bind(this);
    this.setBikes = this.setBikes.bind(this);
    this.setNearestBikePath = this.setNearestBikePath.bind(this);
    this.clearPath = this.clearPath.bind(this);
    this.findPlacePath = this.findPlacePath.bind(this);
    this.clearPlacePath = this.clearPlacePath.bind(this);
    this.setOriginLocation = this.setOriginLocation.bind(this);
    this.setOriginLocation();
  }

  lockMove() {
    this.googleMap.setOptions({draggable: false});
  }

  unLockMove() {
    this.googleMap.setOptions({draggable: true});
  }

  setBikes(bikes) {
    if(this.rubikes.length==0){
      for(var i=0;i<bikes.length;i++){
        var obj = new Bike(this,bikes[i],i);
        obj.attachSecretMessage();
        this.rubikes.push(obj);
      }
    }
    else{
      for(var i=0;i<bikes.length&&i<this.rubikes.length;i++){
        var bike = bikes[i];
        var myLatlng = new google.maps.LatLng(parseFloat(bike.location.latitude),parseFloat(bike.location.longitude));
        this.rubikes[i].marker.setPosition(myLatlng);
      }
    }
  }

  setNearestBikePath() {
    this.target = -1;
    var minDis = 200000;
    for(var i=0;i<this.rubikes.length;i++){
      if(this.rubikes[i].bike.state=='1'){
        var dis = google.maps.geometry.spherical.computeDistanceBetween (this.person.getPosition(), this.rubikes[i].marker.getPosition());
        if(dis<minDis){
          this.target = i;
          minDis = google.maps.geometry.spherical.computeDistanceBetween (this.person.getPosition(), this.rubikes[i].marker.getPosition());
        }
      }
    }
    this.bikeDirections.findPath(this.person.getPosition(),this.rubikes[this.target].marker.getPosition(),function(){
      this.rubikes[this.target].marker.setAnimation(google.maps.Animation.BOUNCE);
    }.bind(this));
  }

  clearPath(){
    this.bikeDirections.clearPath();
    this.rubikes[this.target].marker.setAnimation(null);
    this.target = -1;
  }

  findPlacePath(lat,lng) {
    this.placeDirections.findPath(this.person.getPosition(),{ lat: lat, lng: lng},function(){
    });
  }

  clearPlacePath(){
    this.placeDirections.clearPath();
  }

  setOriginLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.googleMap.setOptions({
          zoom: 18
        });
        this.googleMap.setCenter(initialLocation);
        this.person.setPosition(initialLocation);
      }.bind(this));
    }
  }

}