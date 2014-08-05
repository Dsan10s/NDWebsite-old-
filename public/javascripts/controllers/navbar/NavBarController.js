var ndapp = angular.module('ndapp');

ndapp.controller('navbarController', function($scope, ndService) {

  $scope.viewModel = {
    links: undefined, 
    contactUsText: "Contact Us", 
    locateUsText: "Locate Us"
  };

  (function setViewModel() {
    var links = [{"text": "Home", "href": "/home", "icon": "home"}, 
                 {"text": "Brothers", "href": "/brothers", "icon": "user"}, 
                 {"text": "House", "href": "/house", "icon": "tower"}, 
                 {"text": "About Us", "href": "#", "dataToggle": "modal", "dataTarget": "#aboutModal", "icon": "globe"}];

    $scope.viewModel.links = links;
  })();

  var helpers = (function() {
    function animateHeaderIntro() {
      ndService.headerIntroDeferred.done(function(headerIntro) {
        if (headerIntro) {
          $(".header").css("margin-top", "0px");
          $('.header').animate({"margin-top": "0px"}, 3000).animate({"margin-top": "-140px"}, 750, function(){
            ndService.setHeaderIntro(false);
          });
        }
      });
    }

    return {
      animateHeaderIntro: animateHeaderIntro
    }
  })();

  (function init() {
    eventHandlers();
    
    helpers.animateHeaderIntro();
  })();

  function eventHandlers() {}

});