/*globals mapView*/

mapView.styleCache = {
     'warning': new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#F00',
            opacity: 0.6
          }),
          stroke: new ol.style.Stroke({
            color: '#F00',
            width: 1
          })
        })
      }),

     'selected': new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: '#F00',
            opacity: 0.6
          }),
          stroke: new ol.style.Stroke({
            color: '#FF0',
            width: 2
          })
        })
      }),

     'circle20': new ol.style.Style({
        image: new ol.style.Circle({
          radius: 20,
          stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 2
          })
        })
      })
  }
