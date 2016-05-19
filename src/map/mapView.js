/*globals $, ol, app, mapView */

mapView.layers = {};

mapView.init = function(){
    var map = mapView.createMap('map');
    mapView.drawLayer = new ol.layer.Vector({map: map,
                                             source: new ol.source.Vector() });
    map.addLayer( mapView.eventLayer );
}

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

mapView.zoomTo = function(x, y, zoom){
    var view = mapView.map.getView();
    var feat = new ol.Feature();
    feat.setStyle( mapView.styleCache['circle20'] );

    var panAni = ol.animation.pan({
        source: view.getCenter()
    });
    var zoomAni = ol.animation.zoom({
        resolution: view.getResolution(),
        source: view.getZoom()
    });
    mapView.map.beforeRender(panAni,zoomAni);

    if( typeof(zoom) === "number"){
        view.setZoom(zoom);
    }
    var center = ol.proj.transform( [x,y], 'EPSG:4326', 'EPSG:3857');
    view.setCenter( center );

    //show center for a short period
    feat.setGeometry(new ol.geom.Point(center));
    mapView.drawLayer.getSource().addFeature(feat);
    window.setInterval( function () {
           mapView.drawLayer.getSource().removeFeature(feat);
        } , 5000);

}

mapView.getMyPosition = function(callback){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(myPosition){
           var y = myPosition.coords.latitude;
           var x = myPosition.coords.longitude;
           console.log( x +", "+ y )
           callback( x,y );
        });
    }

}