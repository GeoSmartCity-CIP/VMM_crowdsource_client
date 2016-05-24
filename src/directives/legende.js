/* the sidebar containing the legend of the map*/
/*globals app, $*/
app.sideNav = window.tinkApi.sideNavigation( $("#sideNavLeft") );

app.sideNav.init({
  accordion: true,
  gotoPage: false
});

app.directive('legende', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'directives/legende.html' 
  }
});