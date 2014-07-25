var ndapp = angular.module('ndapp');

ndapp.controller('brotherClassController', function($scope, ndService) {

  $scope.viewModel = {

  }

  var setViewModel = function() {

  }

  var private = (function() {
    return {
      classYear: brotherClassViewVars.classYear, // defined in view
      brothers: {}, 
      brotherNames: []
    }
  })();

  var helpers = (function() {
 
    function sizingJS() {}

    function responsiveJS() {
      sizingJS();
    }

    return {
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {

    ndService.ajax.brothersDeferred(private.classYear).done(function(brothers) {
      ndService.headerIntroDeferred.resolve(false);

      private.brothers = brothers;
      private.brotherNames = Object.keys(brothers);

      setViewModel();

      helpers.sizingJS();
      $(window).resize(function() {
        helpers.responsiveJS();
      });
    });
    

  })();

  function eventHandlers() {
    
  }
});