/*globals app, mapView, $ */
//TODO: BBOX instead of all

mapView.addEventData = function(data){
    var records = new ol.Collection(data);

    records.forEach(function( record ){

         var y = record.location.lat;
         var x = record.location.lon;
         var coordinates = ol.proj.transform([x,y], 'EPSG:4326', 'EPSG:3857'); //to mercator
         record.geometry = new ol.geom.Point(coordinates);

         var feat = new ol.Feature(record);
         mapView.eventLayer.getSource().addFeature(feat);
    });

}

mapView.eventLayer = new ol.layer.Vector({
    source: new ol.source.Vector({}),
    style: function(feature) {
      //var status = feature.get('status');
      return mapView.styleCache['warning'];
    }
});


