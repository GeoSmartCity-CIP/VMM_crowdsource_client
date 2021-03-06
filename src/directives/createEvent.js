/*globals app, gsc */
app.controller('createEventCtrl', ['$scope', '$modalInstance', 'xy',
  function($scope, $modalInstance, xy) {
  
      $scope.title = "Creëer een nieuwe melding";    
      $scope.xy = xy;
      $scope.description = ""; 
      $scope.priority = "low"
      $scope.priorities = ["normal","low","high"];
  
      $scope.ok = function() {
         createEvent( $scope.xy[0], $scope.xy[1], $scope.description, $scope.priority );
         $modalInstance.$close('Ok is pressed');
      }
  
      $scope.cancel = function() {
         $modalInstance.$dismiss('Cancel is pressed');
      }

      var createEvent = function(x,y, description, priority ) {
            var data ={
                "description": description,
                "media": [{"type": "image/png", "uri": "part://1"}],
                "location": {
                    "lat": y,
                    "lon": x,
                    "crs": "epsg:4326"
                },
                "priority": priority,
                "datetime": getTimeStamp(),
                "status": "submitted"
            };
            var request = new FormData();
            request.append('event', JSON.stringify(data));
            request.append('part://1', $('#fileInput')[0].files[0]);

            gsc.cs.eventCreate(request)
                    .done(function(data){
                       app.updateEventData();
                  }).fail(function(err){
                       app.showModal("Error", err, true);
            });
        }


}]);

