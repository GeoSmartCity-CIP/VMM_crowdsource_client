/*globals app*/

app.controller('tabController', ['$scope', function($scope) {
      $scope.activetab = 'Legende';
      $scope.setActive = function(type) {
          $scope.activetab = type;
      };
      $scope.isActive = function(type) {
          return type === $scope.activetab;
      };
}]);

app.directive('tabs', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'directives/tabs.html' 
  }
});