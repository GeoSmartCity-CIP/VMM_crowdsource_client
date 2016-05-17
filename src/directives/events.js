/*globals app */

app.controller('eventController', ['$scope', function($scope) {


}]);

app.directive('events', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'directives/events.html' 
  }
});