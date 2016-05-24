/*globals app */
app.controller('createEventCtrl', ['$scope', '$modalInstance', 'xy',
  function($scope, $modalInstance, xy) {
  
      $scope.title = "Creëer een nieuwe melding";    
      $scope.xy = xy;
      $scope.description = ""; 
      $scope.priority = "low"
      $scope.priorities = ["normal","low","high"];
  
      $scope.ok = function() {
        $modalInstance.$close('Ok is pressed'); 
      }
  
      $scope.cancel = function() {
        $modalInstance.$dismiss('Cancel is pressed'); 
      }

}]);

