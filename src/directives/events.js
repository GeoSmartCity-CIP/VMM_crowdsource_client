/*globals app, gsc, mapView */

app.controller('eventController', ['$scope', function($scope) {

    $scope.events = [];
    $scope.pageSize = 5;
    $scope.page = 0;
    
    $scope.gscWarning = false;

    $scope.numberOfPages=function(){
        return Math.ceil($scope.events.length/$scope.pageSize);
    }

    $scope.zoomTo = function(loc){
        mapView.zoomTo( loc.lon, loc.lat, 12 )
    }

    $scope.maximizeImage= function(name, url){
        var content = '<img src="'+url+'" alt="'+name+'" class="img-responsive">';
        app.openModal( name, content );
    }

    gsc.cs.eventListFilter({}).done(function(events) {
         $scope.events = events;
         mapView.addEventData(events);
         $scope.gscWarning = false;
    }).fail(function (err) {
         $scope.gscWarning = err.statusText ;
    });

}]);

app.directive('events', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'directives/events.html' 
  }
});


