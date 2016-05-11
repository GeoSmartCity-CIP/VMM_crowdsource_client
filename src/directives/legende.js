/* the sidebar containing the legend of the map
*/
var sideNavLeft = $("#sideNavLeft")
var sideNav = window.tinkApi.sideNavigation( sideNavLeft );

sideNav.init({
  accordion: true,
  gotoPage: false
});

app.directive('legende', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'directives/legende.html' 
  }
});