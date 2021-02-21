var map = new MapmyIndia.Map("map", {
    center: [21.1702, 72.8311], zoomControl: true, hybrid: true, search: true
});
var optional_config = {
    location: [28.61, 77.23],
    /* pod:'City',
     bridge:true,
     tokenizeAddress:true,*
     filter:'cop:9QGXAM',
     distance:true,
     width:300,
     height:300*/
};
var marker;
function callback(data) {
    if (data) {
        console.log(data);
        var dt = data[0];
        if (!dt) return false;
        var eloc = dt.eLoc;
        var place = dt.placeName + ", " + dt.placeAddress;
        /*Use elocMarker Plugin to add marker*/
        if (marker) marker.remove();
        marker = new MapmyIndia.elocMarker({ map: map, eloc: eloc, popupHtml: place, popupOptions: { openPopup: true } }).fitbounds();
    }
}

$("#btn-search").click(function () {
    alert('clicked')
    new MapmyIndia.search(document.getElementById("locName").value, optional_config, callback);
});

//* or

// $('your selector').bind("click", function () {
    // your statements;
// });
