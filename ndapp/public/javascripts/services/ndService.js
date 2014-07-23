var ndapp = angular.module('ndapp');

ndapp.service('ndService', function() {

  var headerIntroDeferred = new $.Deferred();

  var ajax = (function() {

    function brotherEventsDeferred() {
      return $.getJSON('/data/brotherEvents', function (data) {
        return data;
      }).fail(function(e) {
        console.log("ERROR: failed to retrieve brotherEvents:", e);
      });
    }

    return {
      brotherEventsDeferred: brotherEventsDeferred
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
});