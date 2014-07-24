var ndapp = angular.module('ndapp');

ndapp.controller('navbarController', function($scope, ndService) {

  $scope.viewModel = {
    links: undefined
  };

  (function setViewModel() {
    var links = [{"text": "Home", "href": "home"}, 
                 {"text": "Brothers", "href": "brothers"}, 
                 {"text": "Events", "href": "events"}, 
                 {"text": "House", "href": "house"}, 
                 {"text": "About Us", "href": "about"}];

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

    var glow;
    // (function d3Init() {
    //   glow = d3.select(".glowContainer")
    //            .append("svg")
    //            .attr("class", "iconGlow")
    //            .attr("width", "120px")
    //            .attr("height", "120px")
    //            .append("circle")
    //            .attr("cx", 60)
    //            .attr("cy", 60)
    //            .attr("r", 39)
    //            .attr("fill", "white");
    // })();
    
    // $(".phoenixIcon").hover(function(){
    //   $(this).animate({"opacity": "1"}, 150);
    //   glow.transition()
    //       .attr("r", 50)
    //       .duration(500);/*.attr("opacity", 0).duration(1500)*/;

    //   $(".iconGlow").animate({"opacity": 1}, 100).animate({"opacity": 0}, 400); 
    //   glow.transition()
    //       .attr("r", 39)
    //       .duration(1)
    //       .delay(500);

    //   $(".iconGlow").animate({"opacity": 1}, 1);
    // }, function(){
    //   $(this).animate({"opacity": "0"}, 150);
    // });

    // $(".phoenixIcon").on("click", function(){
    //   glow.transition()
    //       .attr("r", 50)
    //       .duration(500);/*.attr("opacity", 0).duration(1500)*/;

    //   $(".iconGlow").animate({"opacity": 1}, 100).animate({"opacity": 0}, 400); 
    //   glow.transition()
    //       .attr("r", 40)
    //       .duration(1)
    //       .delay(500);
    //   $(".iconGlow").animate({"opacity": 1}, 1);  
    // });
  }

});