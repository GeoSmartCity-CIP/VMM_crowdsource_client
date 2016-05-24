/*globals app, mapView, $ */

app.controller('tabController', ['$scope', '$modal', function($scope, $modal) {
      $scope.activetab = 'Legende';
      $scope.setActive = function(type) {
          $scope.activetab = type;
      };
      $scope.isActive = function(type) {
          return type === $scope.activetab;
      };
      var evt = {};
      $scope.creatingEvent = false;

      $scope.createEvent = function() {
           $scope.creatingEvent = true;
        };

      $scope.forMyPosition = function() {
           if( typeof(evt.listener) !== "undefined" ) {
                $("#map").css('cursor', 'auto');
                mapView.map.un('click' , evt.listener );
           }
           mapView.getMyPosition( eventForm );
        };
      
      $scope.positionFromMap = function () {
           evt = mapView.positionFromMap( eventForm );
        };  
      
      $scope.cancel = function () {
           if( typeof(evt.listener) !== "undefined" ) {
                $("#map").css('cursor', 'auto');
                mapView.map.un('click' , evt.listener );
           }
           $scope.creatingEvent = false;
        };
      
      var eventForm = function(x,y) {

      var form = $modal.open({
                templateUrl: 'directives/createEvent.html',
                controller: 'createEventCtrl',
                resolve: {
                  backdrop: false,
                  keyboard: false, 
                  xy: function() {
                      return  [x,y];
                  }
                }
              });
        
      form.result.then(
           function(obj) {
              $scope.creatingEvent = false;
        });
      };
      
}]);

app.directive('tabs', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'directives/tabs.html' 
  };
});