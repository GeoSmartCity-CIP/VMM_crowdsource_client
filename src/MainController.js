/*global app, mapView, angular, gsc */

app.controller('MainController', ['$scope', '$http', '$modal', 
function($scope, $http, $modal) {
  
  $scope.mainTitle = "";
  $scope.layers = [];
  //initialize mapview
  mapView.init();

  //tools
  $scope.tools = [{id: "none", name: "Geen active tool", show: true}];
  $scope.activeTool = app.activeTool = "none";
  $scope.toolchange = function () {
      app.activeTool = $scope.activeTool;
  };
  
  $scope.toggleLayer = function(id){
      var lyr = $scope.layers[id];
      mapView.setLayerVisible(id , lyr.visibile );
  };

  //load config 
  $http.get('config.json').then(
      function( response ){
        app.config = response.data;
        $scope.mainTitle = app.config.title;
        $scope.layers = app.config.layers;
        
        gsc.cs.csUrl( app.config.csurl );
         
        angular.forEach( $scope.layers , function(val, idx){
            var wmsLyrs = val.wmslayers.map(function(i){ return i.id; });
            mapView.addWMSlayer(idx, val.url, wmsLyrs, val.name, val.visibile);
            $scope.tools.push({id: idx, name: "Identificeer: " + val.name });
         });
      }, 
      function (err) {
         throw  err;
    });
  
  //modal
  app.openModal = function(title, content, showOK, showCancel) {
      return $modal.open({
        templateUrl: 'directives/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          backdrop: true,
          keyboard: true, 
          modalTitle : function() {
            return  title;
          },
          modalContent: function() {
            return  content;
          },
          OK: function() {
            if (showOK) return true;
            else return false;
          },
          Cancel: function() {
            if (showCancel) return true;
            else return false;
          }
        }
      });
   }

}]);