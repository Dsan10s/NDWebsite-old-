var ndapp = angular.module('ndapp');

ndapp.controller('navbarController', function($scope, ndService) {

  $scope.viewModel = {
    links: undefined
  };

  (function setViewModel() {
    var links = [{"text": "Home", "href": "/home", "icon": "home"}, 
                 {"text": "Brothers", "href": "/brothers", "icon": "user"}, 
                 {"text": "House", "href": "/house", "icon": "tower"}, 
                 {"text": "About Us", "href": "/about", "icon": "globe"}];

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

  function eventHandlers() {/*

    var two = new Two({width: 120, height: 120}).appendTo($(".glowContainer")[0]);
    var r1 = 49, r2 = 60, currentRadius = r1, rDiff = r2 - r1;
    var circle = two.makeCircle(60, 60, r1);
    var animating = false;

    circle.fill = 'white';
    circle.noStroke();

    two.update();


    function animateGlow() {
      if (!animating) {
        animating = true;
        
        two.bind('update', function animateGlowFrame(frameCount) {
          var totalMs = 500;
          var timeRatio = totalMs / 1000;

          var totalFrames = 60 * timeRatio;

          if (frameCount / 60 <= timeRatio) {

            currentRadius += rDiff / totalFrames
            circle.scale = currentRadius / r1;

            var framesBeforeFade = 15;
            if (frameCount > framesBeforeFade) {
              circle.opacity -= 1 / (totalFrames - framesBeforeFade);
            }
          } else {
            circle.scale = 1;
            circle.opacity = 1;
            currentRadius = r1;

            animating = false;
            two.frameCount = 0;
            two.unbind('update', animateGlowFrame);
            two.update();
            two.pause();
          }
        }).play();
      }
    }

    $(".phoenixIcon").on({
      mouseenter: function() {
        animateGlow();
      }, 
      click: function() {
        animateGlow();
      }
    });*/

  }

});