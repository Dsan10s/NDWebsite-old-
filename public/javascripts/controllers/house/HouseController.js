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

  var scrollAmount_ = 175, 
      imgScrollInterval_ = undefined, 
      imgScrollIntervalTime_ = 1500, 
      houseImgsContainerWrapper_ = undefined,
      houseImgsContainer_ = undefined, 
      houseImgsInnerContainer_ = undefined;

  var setPrivateVars = function() {
    houseImgsContainerWrapper_ = $(".houseContainer .houseImgsContainerWrapper");
    houseImgsContainer_ = $(".houseContainer .houseImgsContainer");
    houseImgsInnerContainer_ = $(".houseContainer .houseImgsInnerContainer");
  }

  var helpers = (function() {

    function hideImgScroll() {
      var imgScroll = houseImgsContainerWrapper_;
      var imgScrollHeight = imgScroll.height();
      imgScroll.animate({"bottom": "-" + imgScrollHeight + "px"}, 500);
    }

    function revealImgScroll() {
      var imgScroll = houseImgsContainerWrapper_;
      imgScroll.animate({"bottom": "0"}, 500);
    }
 
    function staticSizingJS() {
      var houseImgsContainerHeight = houseImgsContainer_[0].scrollHeight;
      houseImgsContainerWrapper_[0].style.height = houseImgsContainerHeight + "px";
    }

    function sizingJS() {
      var innerContainer = houseImgsInnerContainer_;
      if (innerContainer.width() - scrollAmount_ < $(window).width()) {
        innerContainer.width($(window).width() + scrollAmount_);
      }
    }

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
      setImgScrollInterval(imgScrollIntervalTime_);
      fancyboxReady();
    })
  })();

  var eventHelpers = (function() {

    function bindImgScrollEvents() {
      houseImgsContainerWrapper_.on({
        mouseenter: clearImgScrollInterval, 
        mouseleave: setImgScrollInterval
      });
    }

    function unbindImgScrollEvents() {
      houseImgsContainerWrapper_.off({
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
    $(".fancybox-thumb").ready(function() {
      fancyboxReady();
    });

    eventHelpers.bindImgScrollEvents();
  }

  /**
   * Called when the fancybox element is ready
   *
   */
  function fancyboxReady() {
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
  }

  /**
   *
   *
   */
  function updateHouseImgs() {
    $scope.$apply(function() {
      var firstImg = public.houseImgs[0];
      public.houseImgs.splice(0, 1);
      public.houseImgs.push(firstImg);
    });
  }

  /**
   *
   *
   */
  function scrollHouseImgs() {
    var container = houseImgsContainer_;

    container.animate({"scrollLeft": scrollAmount_}, 1500, "linear", function() {
      updateHouseImgs();
      container.scrollLeft(0);
    });
  }

  /**
   *
   *
   */
  function setImgScrollInterval(interval) {

    imgScrollInterval_ = setInterval(scrollHouseImgs, interval);
  }

  /**
   *
   *
   */
  function clearImgScrollInterval() {
    if (imgScrollInterval_) {
      window.clearInterval(imgScrollInterval_);
      houseImgsContainer_.stop();
    }
  }
});