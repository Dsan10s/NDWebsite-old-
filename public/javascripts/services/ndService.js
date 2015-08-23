var ndapp = angular.module('ndapp');

ndapp.service('ndService', function() {

  var exports = {};

  exports.vars = {
    
    address: "460 Beacon Street, Boston MA, 02115"
  }

  exports.helpers = {
    /** Returns an object with:
     *  - cssProp: The max or min of the width and the height of the image
     *  - cssVal: The value of the default width if cssProp = width
     *            or height if cssProp = height
     *  @param {DOM img} img: a DOM image element
     *  @param {boolean} maxOrMin: false if you want to use min,
     *                   defaults to true
     *  @param {float/int} mult: optional multiplier to thisHeight
     *                           defaults to 1
     */
    calcImgMaxOrMin: function(img, maxOrMin, mult) {
      maxOrMin = (maxOrMin === undefined) ? true : maxOrMin;
      mult = (mult === undefined) ? 1 : mult;
      var thisHeight = img.naturalHeight * mult;
      var thisWidth = img.naturalWidth;
      var heightOrWidthArray = ['height', 'width'];
      var heightOrWidth = maxOrMin ? Math.max(thisHeight, thisWidth) : Math.min(thisHeight, thisWidth);
      var cssProp, cssVal;
      if (heightOrWidth == thisHeight) {
        cssProp = heightOrWidthArray[0];
        cssVal = thisWidth;
      } else {
        cssProp = heightOrWidthArray[1];
        cssVal = thisHeight;
      }
      return {
        cssProp: cssProp,
        cssVal: cssVal
      }
    }
  }

  exports.ajax = (function() {

    function eventsDeferred() {
      return $.getJSON('/data/events', function (data) {
        return data;
      }).fail(function(e) {
        console.log("ERROR: failed to retrieve events:", e);
      });
    }

    function brothersDeferred(classYear) {
      return $.getJSON('/data/brothers/' + classYear, function(data) {
        return data;
      }).fail(function(e) {
        console.log("ERROR: failed to retrieve brothers:", e);
      })
    }

    function houseGalleryDeferred() {
      return $.getJSON('/data/house/imgArray', function(data) {
        return data;
      }).fail(function(e) {
        console.log("ERROR: failed to retrieve house gallery:", e);
      });
    }

    return {
      eventsDeferred: eventsDeferred, 
      brothersDeferred: brothersDeferred, 
      houseGalleryDeferred: houseGalleryDeferred
    }
  })();

  exports.nanoScrollerInit = function() {
    $(".nano").nanoScroller();
  }

  return exports;
})
.directive("ts", function() {
  return {
    restrict: "AE", 
    scope: {
      text: "@"
    }, 
    templateUrl: "/templates/textSeparator.html"
  };
});