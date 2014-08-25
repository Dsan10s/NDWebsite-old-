var ndapp = angular.module('ndapp', ['ngSanitize']);

ndapp.controller("ndappController", function($scope, ndService) {
  var init = (function() {
    nanoScrollerInit();
  })();

  function nanoScrollerInit() {
    $(".nano").nanoScroller();
  }
}); 