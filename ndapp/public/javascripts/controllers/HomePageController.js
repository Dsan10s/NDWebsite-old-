var ndapp = angular.module('ndapp');

ndapp.controller('homepageController', function($scope, ndService) {

  $scope.viewModel = {
    windowWidth: $(window).width(), 
    monthsWithEvents: [], 
    futureEvents: {}
  }

  var setViewModel = function() {
    $scope.viewModel.windowWidth = $(window).width();
    var futureEvents = getFutureEvents();
    $scope.viewModel.monthsWithEvents = Object.keys(futureEvents);
    $scope.viewModel.futureEvents = futureEvents;
    $scope.$apply();
  }

  var private = (function() {
    return {
      monthArray: ["January", 
                   "February", 
                   "March", 
                   "April", 
                   "May", 
                   "June", 
                   "July", 
                   "August", 
                   "September",  
                   "October", 
                   "November", 
                   "December"], 
      monthsWithEvents: [], 
      animate: true, 
      brotherEvents: []
    }
  })();

  var helpers = (function() {
    function animateLargeIntro() {
      $("body").css("overflow", "hidden");
      $("body").animate({"opacity": 1}, 750, function(){
        $("#trust").animate({"margin-left": "10%", "opacity": "1"}, 750, function(){
          $("#respect").animate({"margin-right": "10%", "opacity": "1"}, 750, function(){
            $("#brotherhood").animate({"font-size": "105px", "opacity": "1"}, 750, function(){
              $("#trust").animate({"margin-left": "-343px"}, 750, function(){
                $(this).hide();
              });
              $("#respect").animate({"margin-right": "-343px", "opacity": "1"}, 750, function(){
                $(this).hide();
              });
              $("#brotherhood").animate({"margin-top": "850px"}, 750, function(){
                $(this).hide();
              });
              $("body").animate({"background": "url(images/Background.PNG) no-repeat center center fixed"}, 750);

              $(".container-fluid").animate({"width": "97.916666666666666666666666666667%" /*"auto"*/, 
                                             "height": "100%", 
                                             "margin-left": "0px", 
                                             "opacity": 1, 
                                             "margin-top": 0}, 750, function(){

                $(".container-fluid").css("position", "relative")
                                     .css("margin-left", "auto")
                                     .css("margin-right", "auto")
                                     .css("display", "block");

                 // Left Section
                $(".eventsWell").height($(".section").height()
                                        - (parseInt($(".section").css("padding"))) 
                                        - (parseInt($(".eventsWell").css("padding")) * 2));
                $(".eventsContent").height($(".eventsWell").height() 
                                           - $(".eventsWell legend").height() 
                                           - parseInt($(".eventsWell legend").css("margin-bottom")) 
                                           - $(".eventsWell .row").height());

                // Middle Section
                $(".wordPresWell").height($(".section").height() 
                                          - (parseInt($(".section").css("padding")) * 2) 
                                          - $(".wordPresSection legend").height() 
                                          - parseInt($(".wordPresSection legend").css("margin-bottom")) 
                                          - (parseInt($(".wordPresWell").css("padding")) * 2));
                $(".wordPresTextContainer").height($(".wordPresWell").height() 
                                                   - (parseInt($(".wordPresWell").css("padding")) * 2) 
                                                   - $(".wordPresWell legend").height() 
                                                   - parseInt($(".wordPresWell legend").css("margin-bottom")) 
                                                   - $(".wordPresWell h3").height());

                // Right Section
                $(".leftWell").height($(".section").height() * 0.42);
                $(".brosContent").height($(".leftWell").height() 
                                         - (parseInt($(".leftWell").css("padding"))) 
                                         - $(".leftWell legend").height() 
                                         - parseInt($(".leftWell legend").css("margin-bottom")));
                $(".aboutContent").height($(".leftWell").height() 
                                          - (parseInt($(".leftWell").css("padding"))) 
                                          - $(".leftWell legend").height() 
                                          - parseInt($(".leftWell legend").css("margin-bottom")));
              });
              
              $(".presTitle").animate({"opacity": 1, "font-size": "38.5px"}, 750);
              $(".section .well").animate({"opacity": 1}, 750);
              $("body").css("overflow", "auto");
            });
          });
        });
      })
    }

    function animateSmallIntro() {
      $("body").css("overflow", "hidden");
      $("body").animate({"opacity": 1}, 750, function(){
        $("#trust").animate({"margin-left": "10%", "opacity": "1"}, 750, function(){
          $("#respect").animate({"margin-right": "10%", "opacity": "1"}, 750, function(){
            $("#brotherhood").animate({"font-size": "105px", "opacity": "1"}, 750, function(){
              $("#trust").animate({"margin-left": "-343px"}, 750, function(){
                $(this).hide();
              });
              $("#respect").animate({"margin-right": "-343px", "opacity": "1"}, 750, function(){
                $(this).hide();
              });
              $("#brotherhood").animate({"margin-top": "850px"}, 750, function(){
                $(this).hide();
              });
              $("body").animate({"background": "url(images/Background.PNG) no-repeat center center fixed"}, 750)
              $(".container-fluid").animate({"width": "97.916666666666666666666666666667%" /*"auto"*/, "height": "auto", "margin-left": "0px", "opacity": 1, "margin-top": 0}, 750, function(){
                /*$(".container-fluid").css("width", $(".container-fluid").width());*/
                $(".container-fluid").css("position", "relative").css("margin-left", "auto").css("margin-right", "auto").css("display", "block");

              });
              
              $(".presTitle").animate({"opacity": 1, "font-size": "38.5px"}, 750);
              $(".section .well").animate({"opacity": 1}, 750);
              $("body").css("overflow", "auto");
            });
          });
        });
      })
    }

    function animateIntro() {
      if (private.animate){
        if ($(window).width() > 1100){
          animateLargeIntro();
        }else{
          animateSmallIntro();
        }
      }else if(!private.animate){
        $("body").css("overflow", "auto");
        $(".container-fluid").css({"width": /*"97.916666666666666666666666666667%"*/ "auto", "height": "100%", "opacity": 1, "margin-left": 0, "margin-top": 0}, 750);
        $(".container-fluid").css("width", $(".container-fluid").width());
        $(".presTitle").css({"opacity": 1, "font-size": "38.5px"}, 750);
        $(".section .well").css({"opacity": 1}, 750);
      }
    }

    /** TODO: Stop using functions for layout */
    function sizingJS() {}

    function responsiveJS(windowWidth) {
      sizingJS();

      $scope.viewModel.windowWidth = windowWidth;
    
      if (windowWidth >= 1100){
        $(".container-fluid").css("width", $(".container-fluid").width());
        $(".container-fluid").css("position", "relative")
                             .css("margin-left", "auto")
                             .css("margin-right", "auto")
                             .css("display", "block");

         // Left Section
        $(".eventsWell").height($(".section").height()
                                 - (parseInt($(".section").css("padding")))
                                 - (parseInt($(".eventsWell").css("padding")) * 2));
        $(".eventsContent").height($(".eventsWell").height()
                                    - $(".eventsWell legend").height()
                                    - parseInt($(".eventsWell legend").css("margin-bottom"))
                                    - $(".eventsWell .row").height());

        // Middle Section
        $(".wordPresWell").height($(".section").height() 
                                  - (parseInt($(".section").css("padding")) * 2) 
                                  - $(".wordPresSection legend").height() 
                                  - parseInt($(".wordPresSection legend").css("margin-bottom"))
                                  - (parseInt($(".wordPresWell").css("padding")) * 2))
        $(".wordPresTextContainer").height($(".wordPresWell").height()
                                           - (parseInt($(".wordPresWell").css("padding")) * 2) 
                                           - $(".wordPresWell legend").height() 
                                           - parseInt($(".wordPresWell legend").css("margin-bottom")) 
                                           - $(".wordPresWell h3").height())

        // Right Section
        $(".leftWell").height($(".section").height() * 0.42);
        $(".brosContent").height($(".leftWell").height() 
                                 - (parseInt($(".leftWell").css("padding"))) 
                                 - $(".leftWell legend").height() 
                                 - parseInt($(".leftWell legend").css("margin-bottom")));
        $(".aboutContent").height($(".leftWell").height() 
                                  - (parseInt($(".leftWell").css("padding"))) 
                                  - $(".leftWell legend").height() 
                                  - parseInt($(".leftWell legend").css("margin-bottom")))
      }
    }

    return {
      animateIntro: animateIntro, 
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {
    ndService.ajax.brotherEventsDeferred().done(function(data) {
      ndService.headerIntroDeferred.resolve(true);

      private.brotherEvents = data.events;

      setViewModel();
      eventHandlers();
      enableNewCssAnimations();

      helpers.animateIntro();

      helpers.sizingJS();
      $(window).resize(function() {
        var windowWidth = $(window).width();
        helpers.responsiveJS(windowWidth);
      });
    });
  })();

  function eventHandlers() {
    $("body").on({
      click: function() {
        if (parseInt($(this).css("height")) <= 101){
          $(this).css("height", "auto");
        }else{
          $(this).css("height", "90px");
        }
      }, 
      mouseenter: function() {
        $(this).animate({backgroundColor: "white"}, 150);
      }, 
      mouseleave: function() {
        if($(this).attr("id") == "Rush"){
          $(this).animate({backgroundColor: "#ffc4c4"}, 150);
        }else if($(this).attr("id") == "CPW"){
          $(this).animate({backgroundColor: "#cdccff"}, 150);
        }else if($(this).attr("id") == "Other Events"){
          $(this).animate({backgroundColor: "#d7ffc4"}, 150);
        }
      }
    }, ".monthEvent");
  }

  function getFutureEvents() {
    var futureEvents = {};
    for (var i = 0; i < private.brotherEvents.length; i++) {
      var thisEvent = private.brotherEvents[i];
      var thisDate = thisEvent.dateString;
      var month = moment(thisDate).format('MMMM');
      

      var now = new Date();

      var thisMoment = moment(thisDate);
      var nowMoment = moment(now);

      var isFuture = (thisMoment.diff(nowMoment, 'seconds') > 0);

      if (isFuture) {
        if (!(month in futureEvents)) {
          futureEvents[month] = [];
        }
        thisEvent.moment = moment(thisMoment).format('dddd MMMM Do YYYY');
        futureEvents[month].push(thisEvent);
      }
    }
    return futureEvents;
  }

  function enableNewCssAnimations() {
    (function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){
      d.fx.step[e]=function(g){
        if(!g.colorInit){
          g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true
        }
        g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),
                                Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),
                                Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)]
                               .join(",")+")"}});
      function b(f){
        var e;
        if(f&&f.constructor==Array&&f.length==3){
          return f
        }
        if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){
          return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]
        }
        if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){
          return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]
        }
        if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){
          return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]
        }
        if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){
          return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]
        }
        if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){
          return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
      }

      function c(g,e){
        var f;
        do{
          f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"
        }
        while(g=g.parentNode);return b(f)
      }

      var a={aqua:[0,255,255],
             azure:[240,255,255],
             beige:[245,245,220],
             black:[0,0,0],
             blue:[0,0,255],
             brown:[165,42,42],
             cyan:[0,255,255],
             darkblue:[0,0,139],
             darkcyan:[0,139,139],
             darkgrey:[169,169,169],
             darkgreen:[0,100,0],
             darkkhaki:[189,183,107],
             darkmagenta:[139,0,139],
             darkolivegreen:[85,107,47],
             darkorange:[255,140,0],
             darkorchid:[153,50,204],
             darkred:[139,0,0],
             darksalmon:[233,150,122],
             darkviolet:[148,0,211],
             fuchsia:[255,0,255],
             gold:[255,215,0],
             green:[0,128,0],
             indigo:[75,0,130],
             khaki:[240,230,140],
             lightblue:[173,216,230],
             lightcyan:[224,255,255],
             lightgreen:[144,238,144],
             lightgrey:[211,211,211],
             lightpink:[255,182,193],
             lightyellow:[255,255,224],
             lime:[0,255,0],
             magenta:[255,0,255],
             maroon:[128,0,0],
             navy:[0,0,128],
             olive:[128,128,0],
             orange:[255,165,0],
             pink:[255,192,203],
             purple:[128,0,128],
             violet:[128,0,128],
             red:[255,0,0],
             silver:[192,192,192],
             white:[255,255,255],
             yellow:[255,255,0],
             transparent:[255,255,255]}
    })(jQuery);
  }

});