var ndapp = angular.module('ndapp');

ndapp.controller('brotherHeaderController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {
    headerText: "The Brothers of Nu Delta"
  }

  var setViewModel = function() {

    if (typeof brotherClassViewVars != "undefined") {
      public.headerText = "Class of " + brotherClassViewVars.classYear;
    } else {
      public.headerText = "The Brothers of Nu Delta";
    }

    $scope.$apply(function() {});
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
    
    // Tooltips
    $(".classSelector .2019Link").tooltip({title: "Coming Soon...", 
                                           placement: "bottom"});
  }
});