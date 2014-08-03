var ndapp = angular.module('ndapp');

ndapp.service('ndService', function() {

  var headerIntroDeferred = new $.Deferred();

  var ajax = (function() {

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
  
  var headerIntro = false; 
  var headerDown = false;

  function getHeaderIntro() {
    return headerIntro;
  }

  function setHeaderIntro(newHeaderIntro) {
    headerIntro = newHeaderIntro
  }

  function getHeaderDown() {
    return headerDown;
  }

  function setHeaderDown(newHeaderDown) {
    headerDown = newHeaderDown
  }

  return {
    headerIntroDeferred: headerIntroDeferred, 

    ajax: ajax,

    getHeaderIntro: getHeaderIntro, 
    setHeaderIntro: setHeaderIntro, 

    getHeaderDown: getHeaderDown, 
    setHeaderDown: setHeaderDown
  }
})
.directive("ts", function() {
  return {
    restrict: "AE", 
    scope: {
      text: "="
    }, 
    templateUrl: "/templates/textSeparator.html"
  };
});