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

mapView.replaceEventData = function(data) {
    mapView.eventLayer.getSource().clear(true);
    mapView.addEventData(data);
}

mapView.addEventLayer = function(){
    mapView.eventLayer = new ol.layer.Vector({
       source: new ol.source.Vector({}),
       style: function(feature) {
            //var status = feature.get('status');
            return mapView.styleCache['warning'];
        }
    });

    mapView.map.on('click', function(evt) {
        if(  app.activeTool !== "event" ) { return; }

        var feature = mapView.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            return feature;
        });
        if ( feature ){
            var title = "";
            var content = "";
            if(feature.get('description')) {
                  title = feature.get('description');
               }
            if(feature.get('datetime')) {
                  content += "<p> Tijd: <em>"+ feature.get('datetime') + "</em>";
               }
            if(feature.get('priority')) {
                  content += " - Prioriteit: <em>"+ feature.get('priority') + "</em>";
               }
            if(feature.get('status')) {
                  content += " - Status: <em>"+ feature.get('status') + "</em></p>";
               }
            var media =  feature.get('media');
            if (media && media.length > 0) {
                  content +=  '<img src="'+ media[0] +'" alt="'+ media[0] +'" onerror="imgError(this);" style="max-height: 350px;"></img>';
            }
            app.openModal( title , content, false, true );
        }
    });
    mapView.addPopover( mapView.eventLayer,'description' );

    mapView.map.addLayer( mapView.eventLayer );
}

mapView.addPopover = function( targetLyr, targetAttr ){
      var node = document.createElement('div');
      node.setAttribute("style", "background-color: lightyellow; margin: 5px;");
      var popup = new ol.Overlay({ element: node });
      mapView.map.addOverlay(popup);

      var displayFeatureInfo = function(pixel) {
          var feature = mapView.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
              if( layer === targetLyr ) return feature;
          });
          if (feature) {
               var extent = feature.getGeometry().getExtent();
               var x = extent[0] + (extent[2] - extent[0]) / 2;
               var y = extent[1] + (extent[3] - extent[1]) / 2;
               node.innerHTML = "<p>"+ feature.get(targetAttr) +"</p>";
               popup.setPosition([x,y]);
          }
          else {
              node.innerHTML = '';
              popup.setPosition(undefined);
          }
     };
     $( mapView.map.getViewport()).on('mousemove', function(evt) {
          var pixel = mapView.map.getEventPixel(evt.originalEvent);
          displayFeatureInfo(pixel );
     });
}
