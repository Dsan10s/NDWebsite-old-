var ndapp = angular.module('ndapp');

ndapp.controller('HouseController', function($scope, ndService) {

  $scope.viewModel = {
    houseImgs: [], 
    currentImg: undefined, 
    houseImgIndex: 0
  }

  var setViewModel = function(options) {
    $scope.viewModel.houseImgs = options.imgArray;

    $scope.viewModel.setHouseImg = function(index) {
      $scope.viewModel.currentImg = $scope.viewModel.houseImgs[index];
      $scope.viewModel.houseImgIndex = index;
    }

    $scope.$apply();
  }

  var private = (function() {
    return {
      mouseEntered: false, 
      currentIndex: undefined, 
      modalShowing: false
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
    ndService.ajax.houseGalleryDeferred().done(function(imgJSON) {
      ndService.headerIntroDeferred.resolve(false);

      var options = {
        imgArray: imgJSON.imgArray
      }

      setViewModel(options);

      helpers.sizingJS();
      $(window).resize(function() {
        helpers.responsiveJS();
      });
    })
  })();

  function eventHandlers() {
    $(document).keyup(function(event){
      if(private.modalShowing){
        if(event.keyCode == 37){ // Left arrow
          $("#chevronLeftDiv").click();
        }else if (event.keyCode == 39){ // Right arrow
          $("#chevronRightDiv").click();
        }
      }
    });
  }
});