var ndapp = angular.module('ndapp');

ndapp.service('navService', function() {
  
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
    getHeaderIntro: getHeaderIntro, 
    setHeaderIntro: setHeaderIntro, 

    getHeaderDown: getHeaderDown, 
    setHeaderDown: setHeaderDown
  }
});