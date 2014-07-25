var ndapp = angular.module('ndapp');

ndapp.controller('navbarController', function($scope, ndService) {

  $scope.viewModel = {
    links: undefined
  };

  (function setViewModel() {
    var links = [{"text": "Home", "href": "/home"}, 
                 {"text": "Brothers", "href": "/brothers"}, 
                 {"text": "House", "href": "/house"}, 
                 {"text": "About Us", "href": "/about"}];

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

  function eventHandlers() {
    // $('body').on("mousemove", function(event){
    //   if (!ndService.getHeaderIntro() || 
    //        ndService.getHeaderIntro() === undefined){

    //     var windowWidth = $(window).width();
    //     var scroll = $(window).scrollTop();

    //     if((event.pageY - scroll < 30 && !ndService.getHeaderDown() && 
    //        (event.pageX/windowWidth < 0.45 || event.pageX/windowWidth > 0.55)) || 
    //        (event.pageY - scroll < 10)){
    //       $('.header').animate({"margin-top": "-140px"}, 300);
    //       ndService.setHeaderDown(true);
    //     }else if(event.pageY - scroll >= 120 && ndService.getHeaderDown() == true){
    //       $('.header').animate({"margin-top": "-170px"}, 300);
    //       ndService.setHeaderDown(false);
    //     }
    //   }
    // });

    var two = new Two({width: 120, height: 120}).appendTo($(".glowContainer")[0]);
    var r1 = 39, r2 = 50, currentRadius = r1, rDiff = r2 - r1;
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
    });

  }

});