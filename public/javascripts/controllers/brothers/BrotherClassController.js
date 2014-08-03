var ndapp = angular.module('ndapp');

ndapp.controller('brotherClassController', function($scope, ndService) {

  $scope.viewModel = {
    brothers: {},
    brotherNames: [], 
    brotherIconCenters: {}, 
    currentIconSize: undefined,
    currentBrother: undefined, 
    calcIconCenters: function() {}
  }
  var public = $scope.viewModel;
  var setViewModel = function(data) {
    $scope.$apply(function() {
      public.brothers = data.brothers;
      public.brotherNames = Object.keys(public.brothers);
      public.calcIconCenters = helpers.calcIconCenters;
    });
    public.currentIconSize = parseInt($(".brotherIconWrapper").css("height"));
  };

  var private = {
    classYear: brotherClassViewVars.classYear, 
    maxSizeMult: 2.2, 
    maxSize: 80
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
      var x = offset.left + (parseInt(elem.css("height"))/2);
      var y = offset.top + (parseInt(elem.css("height"))/2);  
      return {x: x, y: y};
    }

    function calcIconCenters() {
      var iconCenters = {};
      $(".brotherIconWrapper").each(function(i) {
        var center = calcCenter($(this));
        iconCenters["#brotherIcon" + i] = center;
      });
      return iconCenters;
    }

    function setIconSize(wrapper, iconSize) {
      $(wrapper).css("height", iconSize + "px")
                .css("width", iconSize + "px");
      $(wrapper + " .brotherIcon").css("border-radius", (iconSize/2) + "px");
      public.currentIconSize = iconSize;
    }

    function setMaxIconSize (wrapper, iconSize) {
      $(wrapper).css("max-width", iconSize + "px")
                .css("max-height", iconSize + "px");
      $(wrapper + " .brotherIcon").css("border-radius", (iconSize/2) + "px");
    }
 
    function sizingJS() {
      var preIconSize = $(window).width() / public.brotherNames.length;
      var newIconSize = preIconSize - 
                        (preIconSize * private.maxSizeMult / public.brotherNames.length)
      setIconSize(".brotherIconWrapper", newIconSize);
      if (newIconSize < private.maxSize) {
        setMaxIconSize(".brotherIconWrapper", newIconSize);
      } else {
        setMaxIconSize(".brotherIconWrapper", private.maxSize);
      }
      public.currentIconSize = parseInt($(".brotherIconWrapper").css("height"));
    }

    function responsiveJS() {
      sizingJS();
      public.brotherIconCenters = calcIconCenters();
    }

    return {
      calcCenter: calcCenter, 
      calcIconCenters: calcIconCenters,
      setIconSize: setIconSize,
      setMaxIconSize: setMaxIconSize,
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
      $(".brotherIconWrapper").each(function(i) {
        var center = public.brotherIconCenters["#brotherIcon" + i];
        var xDiff = Math.abs(center.x - e.pageX);
        var maxDiff = public.currentIconSize * 2;
        var maxSizeMultDiff = private.maxSizeMult - 1;

        var newSize;

        if (xDiff > maxDiff) {
          newSize = public.currentIconSize;
        } else {
          var multiplier = ((-maxSizeMultDiff/maxDiff)*xDiff) 
                           + private.maxSizeMult;
          newSize = public.currentIconSize * multiplier;
        }

        $(this).css("height", newSize)
               .css("width", newSize);
        $($(this).children()[0]).css("border-radius", newSize/2);
      });
    }

    $("#brotherSelector").on({
      mouseenter: function() {
        helpers.setIconSize(".brotherIconWrapper", 
                            parseInt($(".brotherIconWrapper").css("height")));
        public.brotherIconCenters = public.calcIconCenters();
        helpers.setMaxIconSize(".brotherIconWrapper", 
                               public.currentIconSize * private.maxSizeMult);
        $(document).on("mousemove", resizeIconBullet);
      }, 
      mouseleave: function() {
        $(document).off("mousemove", resizeIconBullet);
        $(".brotherIconWrapper").animate({
          "height": public.currentIconSize, 
          "width": public.currentIconSize, 
          "border-radius": (public.currentIconSize/2) + "px"
        }, 200, function() {
          helpers.setMaxIconSize(".brotherIconWrapper", public.currentIconSize);
        });
      }
    });
  }

});