var ndapp = angular.module('ndapp');

ndapp.controller('Controller', function($scope, ndService) {

  $scope.viewModel = {

  }

  var setViewModel = function() {

    $scope.$apply();
  }

  var private = (function() {
    return {

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
    ndService.headerIntroDeferred.resolve(false);

    setViewModel();

    helpers.sizingJS();
    $(window).resize(function() {
      helpers.responsiveJS();
    });
  })();

  function eventHandlers() {
    
  }
});