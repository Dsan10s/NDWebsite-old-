var ndapp = angular.module('ndapp');

ndapp.controller('brotherClassController', function($scope, ndService) {

  $scope.viewModel = {
    brothers: {},
    brotherNames: [], 
    brotherIconCenters: {}, 
    brotherIconSize: undefined,
    calcIconCenters: function() {}
  }
  var public = $scope.viewModel;
  var setViewModel = function(data) {
    $scope.$apply(function() {
      public.brothers = data.brothers;
      public.brotherNames = Object.keys(public.brothers);
      public.calcIconCenters = helpers.calcIconCenters;
    });
  };

  var private = {
    classYear: brotherClassViewVars.classYear
  };
  var setPrivateVars = function() {
    
  };

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

    function calcIconCenters() {
      var iconCenters = {};
      $(".brotherIcon").each(function(i) {
        var center = calcCenter($(this));
        iconCenters["#brotherIcon" + i] = center;
      });
      return iconCenters;
    }
 
    function sizingJS() {
      // var iconSize = public.brotherIconSize = $(window).width() / public.brotherNames.length;
      // $(".brotherIcon").height(iconSize)
      //                  .width(iconSize)
      //                  .css("border-radius", (iconSize/2) + "px");
    }

    function responsiveJS() {
      sizingJS();
      $scope.viewModel.brotherIconCenters = calcIconCenters();
    }

    return {
      calcCenter: calcCenter, 
      calcIconCenters: calcIconCenters,
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {

    ndService.ajax.brothersDeferred(private.classYear).done(function(brothers) {
      ndService.headerIntroDeferred.resolve(false);

      setPrivateVars();
      setViewModel({brothers: brothers});

      helpers.sizingJS();
      $(window).resize(function() {
        helpers.responsiveJS();
      });

      eventHandlers();
    });
    
  })();

  function eventHandlers() {
    function resizeIconBullet(e) {
      $(".brotherIcon").each(function(i) {
        var center = $scope.viewModel.brotherIconCenters["#brotherIcon" + i];
        var xDiff = Math.abs(center.x - e.pageX);
        var maxSizeMultiplier = 2.2;
        var maxDiff = public.brotherIconSize * 2.5;
        var maxSizeMultDiff = maxSizeMultiplier - 1;

        var newSize;

        if (xDiff > maxDiff) {
          newSize = public.brotherIconSize;
        } else {
          var multiplier = ((-maxSizeMultDiff/maxDiff)*xDiff) 
                           + maxSizeMultiplier;
          newSize = public.brotherIconSize * multiplier;
        }

        $(this).height(newSize)
               .width(newSize)
               .css("border-radius", (newSize/2) + "px");
      });
    }

    $("#brotherSelector").on({
      mouseenter: function() {
        $(document).on("mousemove", resizeIconBullet);
      }, 
      mouseleave: function() {
        $(document).off("mousemove", resizeIconBullet);
        $(".brotherIcon").animate({
          "height": public.brotherIconSize, 
          "width": public.brotherIconSize, 
          "border-radius": (public.brotherIconSize/2) + "px"
        }, 200);
      }
    });
  }

})
.directive("brotherIconDirective", function() {
  return function(scope, element, attrs) {
    if (scope.$last) {
      scope.viewModel.brotherIconSize = $(".brotherIcon").height();
      scope.viewModel.brotherIconCenters = scope.viewModel.calcIconCenters();
    }
  }
});