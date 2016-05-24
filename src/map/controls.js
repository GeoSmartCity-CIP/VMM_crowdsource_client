/*globals ol, app, mapView, navigator */

mapView.zoomToGeolocation = function(opts) {

    var options = opts || {};

    var button = document.createElement('button');
    button.innerHTML = '<span class="fa fa-location-arrow" title="Pan naar mijn locatie" ></span>';

    button.addEventListener('click', function () {
       mapView.getMyPosition ( mapView.zoomTo );
    }, false);

    var element = document.createElement('div');
    element.className = 'zoomto-geoloc ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });

  }

ol.inherits(mapView.zoomToGeolocation, ol.control.Control);