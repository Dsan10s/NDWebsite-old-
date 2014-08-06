var ndapp = angular.module('ndapp');

ndapp.controller('navbarController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  public = $scope.viewModel = {
    links: [{"text": "Home", "href": "/home", "icon": "home"}, 
            {"text": "Brothers", "href": "/brothers", "icon": "user"}, 
            {"text": "House", "href": "/house", "icon": "tower"}, 
            {"text": "About Us", "href": "#", "dataToggle": "modal", "dataTarget": "#aboutModal", "icon": "globe"}] 
  };

  function setViewModel() {};

  // Private ////////////////////////////////////////////////////////

  var helpers = (function() {})();

  var init = (function() {
    eventHandlers();
  });

  function eventHandlers() {}

});