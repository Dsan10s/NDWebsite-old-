var ndapp = angular.module('ndapp');

ndapp.controller('brotherClassController', function($scope, ndService) {

  $scope.viewModel = {
    brothers: {},
    brotherNames: []
  }

  var setViewModel = function(data) {
    private.brothers = data.brothers;
    $scope.viewModel.brotherNames = Object.keys(private.brothers);

    $scope.$apply();
  }

  var private = (function() {
    return {
      classYear: brotherClassViewVars.classYear, // defined in view
      brothers: {}, 
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

      setViewModel({brothers: brothers});

      helpers.sizingJS();
      $(window).resize(function() {
        helpers.responsiveJS();
      });
    });
    

  })();

  function eventHandlers() {
    
  }
});