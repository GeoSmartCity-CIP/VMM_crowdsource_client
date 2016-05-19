/*globals app */
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$sce', 'modalTitle', 'modalContent', 'OK',
  function($scope, $modalInstance, $sce, modalTitle, modalContent, showOK) {
  
      $scope.title = modalTitle;    
      $scope.content = $sce.trustAsHtml(modalContent); 
      $scope.showOK = showOK ;
  
      $scope.ok = function() {
        $modalInstance.$close('ok is pressed'); // To close the controller with a success message
      }
  
      $scope.cancel = function() {
        $modalInstance.$dismiss('cancel is pressed'); // To close the controller with a dismiss message
      }

}]);