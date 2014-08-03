var ndapp = angular.module('ndapp');

ndapp.controller('brotherHomeController', function($scope, ndService) {

  $scope.viewModel = {
    windowWidth: $(window).width()
  }

  var setViewModel = function() {
    $scope.viewModel.windowWidth = $(window).width();
  }

  var private = {};
  var setPrivateVars = function() {
    private.navigator = $("#navigator");
    private.navBulletSize = $(".navBullet").height();
    private.navCenters = helpers.calcNavCenters();
  }

  var helpers = (function() {

    /**
     * Calculates the position of the center of
     * an element.
     */
    function calcCenter(elem) {
      var offset = elem.offset();
      var x = offset.left + (elem.width()/2);
      var y = offset.top + (elem.height()/2);  
      return {x: x, y: y};
    }

    function calcNavCenters() {
      var navCenters = {};
      $(".navBullet").each(function(i) {
        var center = calcCenter($(this));
        navCenters["#navBullet" + (i+1)] = center;
      });
      return navCenters;
    }
 
    function staticSizingJS() {}

    function sizingJS() {}

    function responsiveJS(windowWidth) {
      sizingJS();

      $scope.viewModel.windowWidth = windowWidth;
    }

    return {
      calcCenter: calcCenter,
      calcNavCenters: calcNavCenters, 
      staticSizingJS: staticSizingJS,
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {
    ndService.headerIntroDeferred.resolve(false);

    setPrivateVars();
    setViewModel();

    helpers.staticSizingJS();
    helpers.sizingJS();
    $(window).resize(function() {
      helpers.responsiveJS($(window).width());
    });

    eventHandlers();
  })();

  function eventHandlers() {
    function resizeNavBullet(e) {
      private.navCenters = helpers.calcNavCenters();
      $(".navBullet").each(function(i) {
        var center = private.navCenters["#navBullet" + (i+1)];
        var yDiff = Math.abs(center.y - e.pageY);
        var maxDiff = private.navBulletSize * 1.5;

        var newSize;

        if (yDiff > maxDiff) {
          newSize = private.navBulletSize;
        } else {
          var multiplier = ((-1/(maxDiff*2))*yDiff) + 1.5;
          newSize = private.navBulletSize * multiplier;
        }

        $(this).height(newSize)
               .width(newSize)
               .css("border-radius", (newSize/2) + "px");
      });
    }

    $("#navigator").on({
      mouseenter: function() {
        $(document).on("mousemove", resizeNavBullet);
      }, 
      mouseleave: function() {
        $(document).off("mousemove", resizeNavBullet);
        $(".navBullet").animate({
          "height": private.navBulletSize, 
          "width": private.navBulletSize, 
          "border-radius": (private.navBulletSize/2) + "px"
        }, 200);
      }
    });
  }
});