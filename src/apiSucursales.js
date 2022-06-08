let sucursales = new Map();

const getSucursales = () => {
    fetch('src/resources/sucursales.json').then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        agregarSucursales(data);
        //agregarMarkers(data)
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}



const agregarSucursales = (data) => {
    listadoSucursales = '';
    data.forEach(element => {
        sucursales.set(element.id, element);
        listadoSucursales += '<div class="col-sm-6 ">';
        listadoSucursales += '<div class="card">';
        listadoSucursales += '<div class="card-body">';
        listadoSucursales += '<h5 class="card-title"> ' + element.sucursal + '</h5>';
        listadoSucursales += '<p class="card-text"><b>Domicilio:</b> ' + element.domicilio + '</p>';
        listadoSucursales += '<button onclick=(abrirModal(' + element.id + ')) class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Más detalle</button>';
        listadoSucursales += '</div>';
        listadoSucursales += '</div>';
        listadoSucursales += '</div>';
    });
    document.getElementById("listadoSucursales").innerHTML = listadoSucursales;
}

const abrirModal = (sucursalId) => {
    const sucursal = sucursales.get(sucursalId);
    console.log(sucursal);
    document.getElementById("modalNombreSucursal").innerHTML = sucursal.sucursal;
    document.getElementById("telefonoSucursal").innerHTML = sucursal.telefono;
    document.getElementById("emailSucursal").innerHTML = sucursal.email;
    document.getElementById("domicilioSucursal").innerHTML = sucursal.domicilio;
    agregarMarkerSucursal(sucursal);
}

const agregarMarkers = (data) => {
    map = new OpenLayers.Map("demoMap");
    map.addLayer(new OpenLayers.Layer.OSM());
    map.zoomToMaxExtent();

    data.forEach(element => {

        var lonLat = new OpenLayers.LonLat(element.Lon, element.Lat)
            .transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
            );

        var zoom = 14;
        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        markers.addMarker(new OpenLayers.Marker(lonLat));

        map.setCenter(lonLat, zoom);
    });
}

const agregarMarkerSucursal = (data) => {
    document.getElementById("demoMap").innerHTML = "";
    map = new OpenLayers.Map("demoMap");
    map.addLayer(new OpenLayers.Layer.OSM());
    map.zoomToMaxExtent();
    var lonLat = new OpenLayers.LonLat(data.Lon, data.Lat)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );

    var zoom = 16;
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(lonLat));
    map.setCenter(lonLat, zoom);

}