let sucursales = new Map();
const sjson = `[
    {
        "id":1,
        "sucursal": "San Miguel Centro",
        "domicilio": "Av. Perón 1550",
        "Lat": -34.542541,
        "Lon": -58.711488,
        "telefono": "11 3322 1144",
        "email": "smcentro@vivero.com.ar"
    },
    {
        "id":2,
        "sucursal": "Muñiz",
        "domicilio": "Av. Perón 880",
        "Lat": -34.548002,
        "Lon": -58.704152,
        "telefono": "11 3322 2255",
        "email": "muniz@vivero.com.ar"
    },
    {
        "id":3,
        "sucursal": "Bella Vista",
        "domicilio": "Av. San Martín 1120",
        "Lat": -34.559470,
        "Lon": -58.683572,
        "telefono": "11 3322 3366",
        "email": "bellavista@vivero.com.ar"
    }
]`;

const getSucursales = () => {
    const json = JSON.parse(sjson);
    agregarSucursales(json);
    agregarMarkers(json);
}

/**
 * Agrega las sucursales en cards.
 * @param {*} data 
 */
const agregarSucursales = (data) => {
    listadoSucursales = ``;
    data.forEach(element => {
        sucursales.set(element.id, element);
        listadoSucursales += `<div class="col-sm-12 ">
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">${element.sucursal}</h5>
        <p class="card-text"><b>Domicilio: </b>${element.domicilio}</p>
        <button onclick=(abrirModal(${element.id})) class="btn btn-outline-success btn100" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Más detalle</button>
        </div>
        </div>
        </div>`
    });
    document.getElementById("listadoSucursales").innerHTML = listadoSucursales;
}

/**
 * Al abrir el modal, con el id de la sucursal, se muestran los datos
 * de la misma en el modal.
 * @param {*} sucursalId 
 */
const abrirModal = (sucursalId) => {
    const sucursal = sucursales.get(sucursalId);
    document.getElementById("modalNombreSucursal").innerHTML = sucursal.sucursal;
    document.getElementById("telefonoSucursal").innerHTML = "<b>Telefono: </b>" + sucursal.telefono;
    document.getElementById("emailSucursal").innerHTML = "<b>Correo electrónico: </b>" + sucursal.email;
    document.getElementById("domicilioSucursal").innerHTML = "<b>Domicilio: </b>" + sucursal.domicilio;
    agregarMarkerSucursal(sucursal);
}

/**
 * Ubica todos los markers de las sucursales en el mapa.
 * @param {*} data 
 */
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
        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        markers.addMarker(new OpenLayers.Marker(lonLat));
    });
    var zoom = 14;
    var lonLat = new OpenLayers.LonLat(-58.704152, -34.548002)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );
    map.setCenter(lonLat, zoom);

}

/**
 * Agrega el marker al mapa del modal correspondiente a la sucursal.
 * 
 * @param {*} data recibe un objeto que contiene la longitud y la latitud
 * para ubicar en el mapa. 
 */
const agregarMarkerSucursal = (data) => {
    document.getElementById("mapaModal").innerHTML = "";
    map = new OpenLayers.Map("mapaModal");
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
