var ndapp = angular.module('ndapp');

ndapp.controller('HouseController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  public = $scope.viewModel = {
    houseImgs: [], 
    address: ndService.vars.address.split(",")[0], 
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
      modalShowing: false, 
      imgScrollInterval: undefined, 

      houseImgsContainerWrapper: undefined,
      houseImgsInnerContainer: undefined
    }
  })();
  var setPrivateVars = function() {
    private.houseImgsContainerWrapper = $(".houseContainer .houseImgsContainerWrapper");
    private.houseImgsContainer = $(".houseContainer .houseImgsContainer");
  }

  var helpers = (function() {

    function hideImgScroll() {
      var imgScroll = private.houseImgsContainerWrapper;
      var imgScrollHeight = imgScroll.height();
      imgScroll.animate({"bottom": "-" + imgScrollHeight + "px"}, 500);
    }

    function revealImgScroll() {
      var imgScroll = private.houseImgsContainerWrapper;
      imgScroll.animate({"bottom": "0"}, 500);
    }
 
    function staticSizingJS() {
      var houseImgsContainerHeight = private.houseImgsContainer[0].scrollHeight;
      private.houseImgsContainerWrapper[0].style.height = houseImgsContainerHeight + "px";
    }

    function sizingJS() {}

    function responsiveJS() {
      sizingJS();
    }

    return {
      hideImgScroll: hideImgScroll, 
      revealImgScroll: revealImgScroll, 
      staticSizingJS: staticSizingJS, 
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
      setPrivateVars();

      helpers.staticSizingJS();
      helpers.sizingJS();
      $(window).resize(function() {
        helpers.responsiveJS();
      });

      eventHandlers();
      setImgScrollInterval();

      $(".fancybox-thumb").ready(function() {
        $(".fancybox-thumb").fancybox({
          prevEffect: "none", 
          nextEffect: "none", 
          helpers: {
            title: {
              type: "outside"
            }, 
            thumbs: {
              width: 50, 
              height: 50
            }
          }, 
          beforeLoad: function() {
            helpers.hideImgScroll();
            eventHelpers.unbindImgScrollEvents();
            clearImgScrollInterval();
          }, 
          beforeClose: function() {
            helpers.revealImgScroll();
          }, 
          afterClose: function() {
            eventHelpers.bindImgScrollEvents();
            setImgScrollInterval();
          }
        });
      });
    })
  })();

  var eventHelpers = (function() {

    function bindImgScrollEvents() {
      private.houseImgsContainerWrapper.on({
        mouseenter: clearImgScrollInterval, 
        mouseleave: setImgScrollInterval
      });
    }

    function unbindImgScrollEvents() {
      private.houseImgsContainerWrapper.off({
        mouseenter: clearImgScrollInterval, 
        mouseleave: setImgScrollInterval
      });
    }

    return {
      bindImgScrollEvents: bindImgScrollEvents, 
      unbindImgScrollEvents: unbindImgScrollEvents
    }
  })();

  function eventHandlers() {
    eventHelpers.bindImgScrollEvents();
  }

  function updateHouseImgs() {
    $scope.$apply(function() {
      var firstImg = public.houseImgs[0];
      public.houseImgs.splice(0, 1);
      public.houseImgs.push(firstImg);
    });
  }

  function scrollHouseImgs() {
    var container = private.houseImgsContainer;

    container.animate({"scrollLeft": 170}, 1500, "linear", function() {
      updateHouseImgs();
      container.scrollLeft(0);
    });
  }

  function setImgScrollInterval() {
    private.imgScrollInterval = setInterval(scrollHouseImgs, 1500);
  }

  function clearImgScrollInterval() {
    if (private.imgScrollInterval) {
      window.clearInterval(private.imgScrollInterval);
      private.houseImgsContainer.stop();
    }
  }
});