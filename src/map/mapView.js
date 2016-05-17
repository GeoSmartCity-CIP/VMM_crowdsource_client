/*globals $, ol, app */

var mapView = {};
mapView.layers = {};

//TODO?: also add WFS, http://openlayers.org/en/v3.6.0/examples/vector-wfs.html 
mapView.addWMSlayer = function(id, layerUrl, layers, name, visible ){
    var url = layerUrl.split("?")[0];
    var wmsSource =  new ol.source.ImageWMS({
            url: url,
            title: name,
            params: {'LAYERS':  layers.join(',')}
        });
    var wmsLyr = new ol.layer.Image({
            source: wmsSource,
            visible: visible
        });
    mapView.map.addLayer( wmsLyr );
    mapView.layers[id] = wmsLyr;
    
    /*POPUP*/
    mapView.map.on('singleclick', function(evt) {
        if ( app.activeTool == id ){
            var viewResolution = mapView.map.getView().getResolution() ;
            var viewProjection = mapView.map.getView().getProjection();
            var url = wmsSource.getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection, {'INFO_FORMAT': 'text/html'});
            app.openModal( name , '<iframe src="' + url + '"></iframe>' );
        }
    });
    return wmsLyr;
};

mapView.clearAllLayers = function(){
    for (var lyrId in mapView.layers) {
        var lyr = mapView[lyrId];
        mapView.map.removeLayer(lyr);
        delete mapView[lyrId];
    }
};
mapView.setLayerVisible = function(layerId, visibility){
    var lyr = mapView.layers[layerId];
    lyr.setVisible( visibility );
};
mapView.setBackground = function( urlTemplate ){
    mapView.background.getSource().setUrls([ urlTemplate ]);
    return mapView.background;
};
mapView.createMap = function( mapId ){
    if( typeof( mapView.map) !== "undefined" ) { return; }
    
    mapView.background = new ol.layer.Tile({
        source: new ol.source.XYZ({
                url: "http://tile.informatievlaanderen.be/ws/raadpleegdiensten/tms/1.0.0/grb_bsk@GoogleMapsVL/{z}/{x}/{-y}.png"
            })
        });
    mapView.map = new ol.Map({
        target: mapId,
        layers: [ mapView.background ],
        view: new ol.View({
              center: ol.proj.fromLonLat([4, 51]),
              zoom: 9
            }), 
        controls: ol.control.defaults().extend([ new ol.control.ScaleLine() ])
    });
    return mapView.map;
};
mapView.createMap('map'); 


