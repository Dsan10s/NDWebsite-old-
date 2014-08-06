var ndapp = angular.module('ndapp');

ndapp.controller('HouseController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  public = $scope.viewModel = {
    houseImgs: [], 
    currentImg: undefined, 
    houseImgIndex: 0
  }
  var setViewModel = function(options) {
    $scope.$apply(function() {
      public.houseImgs = options.imgArray;
    });
  }

  public.setHouseImg = function(index) {
    public.currentImg = public.houseImgs[index];
    public.houseImgIndex = index;
  }

  // Private ////////////////////////////////////////////////////////

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

  function eventHandlers() {}
});