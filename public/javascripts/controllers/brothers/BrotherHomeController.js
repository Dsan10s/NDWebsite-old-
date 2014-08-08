var ndapp = angular.module('ndapp');

ndapp.controller('brotherHomeController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {
    carouselImgs: [
      {"src": "images/brothers/MaineHouse2013.jpg", 
       "caption": "Brotherhood Retreat 2013"}, 

      {"src": "images/brothers/NDApplePicking3.jpg", 
       "caption": "Apple Picking"}, 

      {"src": "images/brothers/NDComposite.jpg", 
       "caption": "Nu Delta Composite 2013"}, 

      {"src": "images/brothers/NuSoul.jpg", 
       "caption": "Nu Soul at AKO LipSync"}, 

      {"src": "images/brothers/Beach2.jpg", 
       "caption": ""}, 

      {"src": "images/brothers/2014Formal.jpg", 
       "caption": "Class of 2014 at Nu Delta Formal"}
    ]
  }
  var setViewModel = function() {}

  // Private ////////////////////////////////////////////////////////

  var private = {

    carousel: undefined
  };
  var setPrivateVars = function() {
    
    private.carousel = $("#brotherHomeCarousel");
  }

  var helpers = (function() { 

    function sizingJS() {
      var aspectRatio = 16/9;
      var carouselWidth = private.carousel.width();
      private.carousel.height(carouselWidth/aspectRatio);
    }

    function responsiveJS() {
      sizingJS();
    }

    return {
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {
    setPrivateVars();
    setViewModel();

    helpers.sizingJS();
    $(window).resize(function() {
      helpers.responsiveJS();
    });

    eventHandlers();
  })();

  function eventHandlers() {

    // Tooltips
    $(".classSelector .2018Link").tooltip({title: "Coming Soon...", 
                                           placement: "bottom"});
  }
});