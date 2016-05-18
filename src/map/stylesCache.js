/*globals mapView*/

mapView.styleCache = {
     'warning': new ol.style.Style({
        image: new ol.style.Icon({
                src: '/images/warning.png'
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
