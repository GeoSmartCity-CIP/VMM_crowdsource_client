
    
app.controller('MainController', ['$scope', '$modal', function($scope, $modal) {
  $scope.mainTitle = "Crowdsource app";
  
  $scope.layers = [{name: "Rioolnetwerk" , type: "wms", visibile: true, 
    url: "http://geoservices.informatievlaanderen.be/raadpleegdiensten/VMM/wms",
    wmslayers: ["HYDPNT","STRENG","KOPPNT"]
  }];
  
  $scope.toggleLayer = function(idx){
      var lyr = $scope.layers[idx];
      mapView.setLayerVisible(idx , lyr.visibile );
  }
  
  angular.forEach( $scope.layers , function(val, key){
      mapView.addWMSlayer(key, val.url, val.wmslayers, val.name, val.visibile);
        
  });

  app.openModal = function(title, content) {
      var modalInstance = $modal.open({
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