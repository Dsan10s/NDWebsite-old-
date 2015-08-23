var ndapp = angular.module('ndapp');

ndapp.controller('Controller', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {

  }

  var setViewModel = function() {

    $scope.$apply(function() {

    });
  }

  // Private ////////////////////////////////////////////////////////

  var helpers = (function() {

    var exports = {};

    /**
     * Called to set the sizing of elements of the page
     *
     */
    exports.sizingJS = function() {}

    /**
     * Called whenever the window is resized
     *
     */
    exports.responsiveJS = function() {
      exports.sizingJS();
    }

    return exports;
  })();

  var init = (function() {
    setViewModel();

    helpers.sizingJS();
    $(window).resize(function() {
      helpers.responsiveJS();
    });

    eventHandlers();
  })();

  /**
   * All event related code initialized here
   *
   */
  function eventHandlers() {
    
  }
});