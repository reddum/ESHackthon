export default class Person{
  constructor(map){
    this.icon = {
      url: 'https://freeiconshop.com/files/edd/person-flat.png', // url
      scaledSize: new google.maps.Size(40, 40), // scaled size
    };
    this.marker = new google.maps.Marker({
      map:map.googleMap,
      position:{ lat: 24.792081, lng: 120.992631},
      icon: this.icon
    });
    this.setPosition = this.setPosition.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  setPosition(initialLocation){
    this.marker.setPosition(initialLocation);
  }

  getPosition(){
    return this.marker.getPosition();
  }
}