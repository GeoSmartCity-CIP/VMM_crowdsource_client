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
            //create a modal form
           $modal.open({
                templateUrl: 'directives/createEvent.html',
                controller: 'createEventCtrl',
                resolve: {
                  backdrop: false,
                  keyboard: false, 
                  xy: function() {
                      return  [x,y]; }
                 }
              }).result.then(     //when fotm closed
                 function() {
                   $scope.creatingEvent = false;
             });
      };

      app.newEvent = function(){
          $scope.activetab = 'Meldingen';
          $scope.creatingEvent  = true;
          app.sideNav.openMenu();
      }
}]);

app.directive('tabs', function() {
  return { 
    restrict: 'E', 
    templateUrl: 'directives/tabs.html' 
  };
});