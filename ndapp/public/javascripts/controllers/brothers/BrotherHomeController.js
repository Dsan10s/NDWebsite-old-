var ndapp = angular.module('ndapp');

ndapp.controller('brotherHomeController', function($scope, ndService) {

  $scope.viewModel = {
    windowWidth: $(window).width()
  }

  var setViewModel = function() {
    $scope.viewModel.windowWidth = $(window).width();
    $scope.$apply();
  }

  var private = (function() {
    return {

    }
  })();

  var helpers = (function() {
 
    function sizingJS() {}

    function responsiveJS(windowWidth) {
      sizingJS();

      $scope.viewModel.windowWidth = windowWidth;
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
      helpers.responsiveJS($(window).width());
    });
  })();

  function eventHandlers() {

  }
});