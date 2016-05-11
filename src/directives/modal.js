
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$sce', 'modalTitle', 'items', 
function($scope, $modalInstance, $sce, modalTitle, items) {

    $scope.title = modalTitle;    
    $scope.content = $sce.trustAsHtml(items); ;

    $scope.cancel = function() {
      $modalInstance.$dismiss('cancel is pressed'); // To close the controller with a dismiss message
    }

}]);