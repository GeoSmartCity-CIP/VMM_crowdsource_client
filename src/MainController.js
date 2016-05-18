/*global app, mapView, angular, $ */

app.controller('MainController', ['$scope', '$modal', function($scope, $modal) {
  
  $scope.mainTitle = "Crowdsource app";
  //initialize mapview
  mapView.init();

  //tools
  $scope.tools = [{id: "cs-event", name: "Melding", show: true}];
  $scope.activeTool = app.activeTool = "cs-event";
  $scope.toolchange = function () {
      app.activeTool = $scope.activeTool;
  };
  
  //layers
  $scope.layers = [{name: "Rioolnetwerk" , type: "wms", visibile: true, 
    url: "http://geoservices.informatievlaanderen.be/raadpleegdiensten/VMM/wms",
    wmslayers: [{name:"Hydropunt",  id:"HYDPNT"}, //name is for display, id is layerid in wms
                {name:"Streng",     id:"STRENG"}, 
                {name:"Koppelpunt", id:"KOPPNT"}]
  } , {name: "mercatorNet", type:"wms", visibile: false, 
    url: "//www.mercator.vlaanderen.be/raadpleegdienstenmercatorpubliek/ows", 
    wmslayers: [{name: "Habitat gebied", id:"ps:ps_hbtrl"}]
  }];
  $scope.toggleLayer = function(id){
      var lyr = $scope.layers[id];
      mapView.setLayerVisible(id , lyr.visibile );
  };
  angular.forEach( $scope.layers , function(val, idx){
      var wmsLyrs = val.wmslayers.map(function(i){ return i.id; });
      mapView.addWMSlayer(idx, val.url, wmsLyrs, val.name, val.visibile);
      $scope.tools.push({id: idx, name: "Identificeer: " + val.name })
  });
  
  //modal
  app.openModal = function(title, content) {
      $modal.open({
        templateUrl: 'directives/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          backdrop: false,
          keyboard: true, 
          modalTitle : function() {
            return  title;
          },
          items: function() {
            return  content;
          }
        }
      });
   }

}]);