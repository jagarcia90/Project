var map;
var infowindow;
var sacramento = { lat: 38.575764, lng: -121.478851 };
var service;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
        console.log(position.coords.latitude);
    });

}

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.575764, lng: -121.478851 },
        zoom: 17
    });

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: sacramento,
        radius: 2000,
        type: ['restaurant']
    }, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                console.log(results[i].rating);
                console.log(results[i].vicinity);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            animation: google.maps.Animation.BOUNCE
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name + '<p>Rating ' + place.rating + '</p>'  + `<p> Address ${place.vicinity}</p>`);
            infowindow.open(map, this);
            console.log(place.name);
        });
        return marker;

    }
}



//trying on embeded map