var ndapp = angular.module('ndapp');

ndapp.controller('brotherClassController', function($scope, $sce, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {
    classYear: brotherClassViewVars.classYear, 
    brothers: {},
    brotherNames: [],  
    currentBrotherName: undefined, 
    currentBrotherFirstName: undefined, 
    currentBrother: undefined, 
  }
  var setViewModel = function(data) {
    $scope.$apply(function() {
      public.brothers = data.brothers;
      public.brotherNames = Object.keys(public.brothers);
    });
  };

  public.setCurrentBrother = function(brother) {
    public.currentBrotherName = $sce.trustAsHtml(brother);
    public.currentBrotherFirstName = public.currentBrotherName.toString().split(" ")[0];
    public.currentBrother = public.brothers[brother];

    if (familyCell_) {
      familyCell_.css("background-color", "white")
                 .css("color", "#000");
    }

    familyCell_ = $("#" + public.classYear + "-" + public.currentBrother.info[0].info);
    familyCell_.css("background-color", "#a90329")
               .css("color", "white");

    $(".brotherClassContainer .brotherClassContent").scrollTop(0);
  }

  // Private ////////////////////////////////////////////////////////

  var maxSizeMult_ = 2.2, 
      maxSize_ = 80,
      currentIconSize_ = undefined,
      brotherIconCenters_ = {},
      familyCell_ = undefined, 
      brotherIconWrappers_ = undefined;

  var setPrivateVars = function() {

    currentIconSize_ = parseInt($(".brotherIconWrapper").css("height"));
  };

  var helpers = (function() {

    /**
     * Calculates the position of the center of
     * an element.
     * 
     * @param {element} elem - the element which you want to calculate
     *                         the center of
     *
     * @returns {object} object with x and y coordinates of element
     */
    function calcCenter(elem) {
      var offset = elem.offset();
      var x = offset.left + (parseInt(elem.css("height"))/2);
      var y = offset.top + (parseInt(elem.css("height"))/2);  
      return {x: x, y: y};
    }

    /**
     * Calculates the center positions of each brother icon
     * 
     * @returns {object} object mapping dom id of brother icon 
     *                   to an object designating the coordinates
     *                   of its center
     */
    function calcIconCenters() {
      var iconCenters = {};
      brotherIconWrappers_.each(function(i) {
        var center = calcCenter($(this));
        iconCenters["#brotherIcon" + i] = center;
      });
      return iconCenters;
    }
    
    /**
     * Sets the size of every brother icon
     *
     * @param {element} wrapper - the element that encloses each icon
     * @param {number || string} - the desired size of each icon
     */
    function setIconSize(wrapper, iconSize) {
      $(wrapper).css("height", iconSize + "px")
                .css("width", iconSize + "px");
      $(wrapper + " .brotherIcon").css("border-radius", (iconSize/2) + "px");
      currentIconSize_ = iconSize;
    }
    
    /**
     * Sets the max size of every brother icon
     *
     * @param {element} wrapper - the element that encloses each icon
     * @param {number || string} - the desired max size of each icon
     */
    function setMaxIconSize (wrapper, iconSize) {
      $(wrapper).css("max-width", iconSize + "px")
                .css("max-height", iconSize + "px");
      $(wrapper + " .brotherIcon").css("border-radius", (iconSize/2) + "px");
    }
    
    /**
     * Called to set the sizing of elements of the page
     *
     */ 
    function sizingJS() {
      var preIconSize = $(window).width() / public.brotherNames.length;
      var newIconSize = preIconSize - 
                        (preIconSize * maxSizeMult_ / public.brotherNames.length)
      setIconSize(".brotherIconWrapper", newIconSize);
      if (newIconSize < maxSize_) {
        setMaxIconSize(".brotherIconWrapper", newIconSize);
      } else {
        setMaxIconSize(".brotherIconWrapper", maxSize_);
      }

      if (!brotherIconWrappers_) {
        brotherIconWrappers_ = $(".brotherIconWrapper");
      }
      currentIconSize_ = parseInt(brotherIconWrappers_.css("height"));
    }
    
    /**
     * Called whenever the window is resized
     *
     */
    function responsiveJS() {
      sizingJS();
      brotherIconCenters_ = calcIconCenters();
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
    ndService.ajax.brothersDeferred(public.classYear).done(function(brothers) {

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

    /**
     * Called whenever the mouse moves in the brother icon selector area
     * Resizes each brother icon depening on where the mouse is
     */
    function resizeIconBullet(e) {
      if (!brotherIconWrappers_ || brotherIconWrappers_.length == 0) {
        brotherIconWrappers_ = $(".brotherIconWrapper");
      }
      brotherIconWrappers_.each(function(i) {
        var center = brotherIconCenters_["#brotherIcon" + i];
        var xDiff = Math.abs(center.x - e.pageX);
        var maxDiff = currentIconSize_ * 2;
        var maxSizeMultDiff = maxSizeMult_ - 1;

        var newSize;

        if (xDiff > maxDiff) {
          newSize = currentIconSize_;
        } else {
          var multiplier = ((-maxSizeMultDiff/maxDiff)*xDiff) 
                           + maxSizeMult_;
          newSize = currentIconSize_ * multiplier;
        }

        $(this).css("height", newSize)
               .css("width", newSize);
        $($(this).children()[0]).css("border-radius", newSize/2);
      });
    }

    $("#brotherSelector").on({
      mouseenter: function() {
        helpers.setIconSize(".brotherIconWrapper", 
                            parseInt(brotherIconWrappers_.css("height")));
        brotherIconCenters_ = helpers.calcIconCenters();
        helpers.setMaxIconSize(".brotherIconWrapper", 
                               currentIconSize_ * maxSizeMult_);
        $(document).on("mousemove", resizeIconBullet);
      }, 
      mouseleave: function() {
        $(document).off("mousemove", resizeIconBullet);
        brotherIconWrappers_.animate({
          "height": currentIconSize_, 
          "width": currentIconSize_, 
          "border-radius": (currentIconSize_/2) + "px"
        }, 200, function() {
          helpers.setMaxIconSize(".brotherIconWrapper", currentIconSize_);
        });
      }
    });
  }
});