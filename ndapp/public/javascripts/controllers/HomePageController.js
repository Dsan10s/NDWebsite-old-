var ndapp = angular.module('ndapp');

ndapp.controller('homepageController', function($scope, navService) {

  var private = (function() {
    return {
      monthsWithEvents: [], 
      animate: true
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
              $("body").animate({"background": "url(Images/Background.PNG) no-repeat center center fixed"}, 750)
              $(".container-fluid").animate({"width": "97.916666666666666666666666666667%" /*"auto"*/, "height": "100%", "margin-left": "0px", "opacity": 1, "margin-top": 0}, 750, function(){
                /*$(".container-fluid").css("width", $(".container-fluid").width());*/
                $(".container-fluid").css("position", "relative").css("margin-left", "auto").css("margin-right", "auto").css("display", "block");

                 // Left Section
                $(".eventsWell").height($(".section").height() - (parseInt($(".section").css("padding"))) - (parseInt($(".eventsWell").css("padding")) * 2))
                $(".eventsContent").height($(".eventsWell").height() - $(".eventsWell legend").height() - parseInt($(".eventsWell legend").css("margin-bottom")) - $(".eventsWell .row").height());

                // Middle Section
                $(".wordPresWell").height($(".section").height() - (parseInt($(".section").css("padding")) * 2) - $(".wordPresSection legend").height() - parseInt($(".wordPresSection legend").css("margin-bottom")) - (parseInt($(".wordPresWell").css("padding")) * 2))
                $(".wordPresTextContainer").height($(".wordPresWell").height() - (parseInt($(".wordPresWell").css("padding")) * 2) - $(".wordPresWell legend").height() - parseInt($(".wordPresWell legend").css("margin-bottom")) - $(".wordPresWell h3").height())

                // Right Section
                $(".leftWell").height($(".section").height() * 0.42);
                $(".brosContent").height($(".leftWell").height() - (parseInt($(".leftWell").css("padding"))) - $(".leftWell legend").height() - parseInt($(".leftWell legend").css("margin-bottom")))
                $(".aboutContent").height($(".leftWell").height() - (parseInt($(".leftWell").css("padding"))) - $(".leftWell legend").height() - parseInt($(".leftWell legend").css("margin-bottom")))
               

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
              $("body").animate({"background": "url(Images/Background.PNG) no-repeat center center fixed"}, 750)
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

    return {
      animateIntro: animateIntro
    }
  })

  (function init() {
    eventHandlers();

    navService.setHeaderIntro(true);
    helpers.animateIntro();
  })();

  function eventHandlers() {
    $(".monthEvents").on({
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
    });
  }
}


var HomePageController = function() {
}

function eventsPageWideScreen(){
  $("#mainContainer").html("");
  var content = $('<div class = "row-fluid" style = "margin-top: 90px">'
        + '<div class = "section span3">'
          + '<div class = "eventsWell well well-large">'
            + '<legend class = "sectionHead"><h1><a style = "color: black" href = "NDEvents.html">Events</a></h1></legend>'
              + '<div class = "row" style = "margin: 0px">'
                + '<div style = "display: inline-block">'
                  + '<h4 class = "colorCodeText">Rush</h4><div class = "colorCode rushColor"></div>'
                + '</div>'
                + '<div style = "display: inline-block">'
                  + '<h4 class = "colorCodeText">CPW</h4><div class = "colorCode cpwColor"></div>'
                + '</div>'
                + '<div style = "display: inline-block">'
                  + '<h4 class = "colorCodeText">Other Events</h4><div class = "colorCode otherEventsColor"></div>'
                + '</div>'
              + '</div>'
            + '<div class = "content eventsContent">'

              + '<!--Months get appended here-->'

            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class = "section span6 wordPresSection">'
          + '<legend style = "border-color: white"><h1 class = "presTitle" style = "text-align: center; color: white">A Word from the President</h1></legend>'
          + '<div class = "wordPresWell well well-large">'
            + '<div style = "color: black">'
              + '<legend style = "padding-bottom: 20px; border-bottom: 1px solid black"><img src = "Images/PresidentPic.jpg" class = "presPic img-polaroid"></legend>'
              + '<h3 style = "text-align: center">David McClelland</h3>'
              + '<div class = "wordPresTextContainer">'
                + '<p class = "wordPresText" style = "text-align: center">'
                  + 'They say college is the best 4 years of your life. While you&#146;re here, your university teaches you much more than what it offers the classroom; you learn things about yourself you never thought you were capable of, and the decisions you make while you&#146;re an undergraduate will forever influence your future success. Who will you spend these 4 critical years with? Based on our 3 pillars of trust, respect, and brotherhood, Nu Delta Fraternity has given me my second family and my home away from home. Here, we make friendships that last much longer than 4 years, and make connections that last a lifetime.'
                + '</p>'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</div>'
        + '<div class = "section span3">'
          + '<div class = "leftWell brosWell well well-large">'
            + '<legend class = "sectionHead"><h1><a style = "color: black" href = "NDBrothersHome.html">Meet the Brothers</a></h1></legend>'
            + '<div class = "content brosContent">'
              + '<a href = "NDBrothersHome.html"><img class = "brosContentPic img-polaroid" src = "Images/MaineHouse2013.jpg"></a>'
              + '<p style = "text-align: center; font-size: 14pt; margin: 0px; margin-top: 16px">Want to learn more about the brothers?  Click here to check them out</p>'
            + '</div>'
          + '</div>'
          + '<div class = "leftWell aboutWell well well-large">'
            + '<legend class = "sectionHead"><h1><a style = "color: black" href = "NDAboutUs.html">About Us</a></h1></legend>'
            + '<div class = "content aboutContent">'
              + '<h5>Contact Info</h5>'
              + '<p>Email: nd_president@mit.edu.</p>'
              + '<h5>Location</h5>'
              + '<p>460 Beacon Street</p>'
              + '<p>Boston, Massachusetts, 02115</p>'
              + '<a href="https://maps.google.com/maps?q=460+Beacon+Street,+Boston,+MA&hl=en&sll=42.351474,-71.087816&sspn=0.006684,0.016512&oq=460+Beacon+Street+&t=h&hnear=460+Beacon+St,+Boston,+Suffolk,+Massachusetts+02115&z=17&iwloc=A">'
                + '<img id = "locationImg" src = "Images/LocationMapsPic.jpg">'
              + '</a>'
            + '</div>'
          + '</div>'
        + '</div>')
  $("#mainContainer").append(content);
  $(".well").css("opacity", 1);
  $(".presTitle").css("opacity", 1).css("font-size", "38.5px");
  $(".section").css("height", "820px");


}

function eventsPageSmallScreen(){
  $("#mainContainer").html("");
  var content = $('<div class = "row-fluid" style = "margin-top: 90px">'
        + '<div class = "section wordPresSection">'
          + '<legend style = "border-color: white"><h1 class = "presTitle" style = "text-align: center; color: white">A Word from the President</h1></legend>'
          + '<div class = "wordPresWell well well-large">'
            + '<div style = "color: black">'
              + '<legend style = "padding-bottom: 20px; border-bottom: 1px solid black"><img src = "Images/PresidentPic.jpg" class = "presPic img-polaroid"></legend>'
              + '<h3 style = "text-align: center">David McClelland</h3>'
              + '<div class = "wordPresTextContainer">'
                + '<p class = "wordPresText" style = "text-align: center">'
                  + 'They say college is the best 4 years of your life. While you&#146;re here, your university teaches you much more than what it offers the classroom; you learn things about yourself you never thought you were capable of, and the decisions you make while you&#146;re an undergraduate will forever influence your future success. Who will you spend these 4 critical years with? Based on our 3 pillars of trust, respect, and brotherhood, Nu Delta Fraternity has given me my second family and my home away from home. Here, we make friendships that last much longer than 4 years, and make connections that last a lifetime.'
                + '</p>'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</div>'

        + '<div class = "section">'
          + '<div class = "eventsWell well well-large">'
            + '<legend class = "sectionHead"><h1><a style = "color: black" href = "NDEvents.html">Events</a></h1></legend>'
              + '<div class = "row" style = "margin: 0px">'
                + '<div style = "display: inline-block">'
                  + '<h4 class = "colorCodeText">Rush</h4><div class = "colorCode rushColor"></div>'
                + '</div>'
                + '<div style = "display: inline-block">'
                  + '<h4 class = "colorCodeText">CPW</h4><div class = "colorCode cpwColor"></div>'
                + '</div>'
                + '<div style = "display: inline-block">'
                  + '<h4 class = "colorCodeText">Other Events</h4><div class = "colorCode otherEventsColor"></div>'
                + '</div>'
              + '</div>'
            + '<div class = "content eventsContent">'

              + '<!--Months get appended here-->'

            + '</div>'
          + '</div>'
        + '</div>'
        
        + '<div class = "section">'
          + '<div class = "leftWell brosWell well well-large">'
            + '<legend class = "sectionHead"><h1><a style = "color: black" href = "NDBrothersHome.html">Meet the Brothers</a></h1></legend>'
            + '<div class = "content brosContent">'
              + '<a href = "NDBrothersHome.html"><img class = "brosContentPic img-polaroid" src = "Images/MaineHouse2013.jpg"></a>'
              + '<p style = "text-align: center; font-size: 14pt; margin: 0px; margin-top: 16px">Want to learn more about the brothers?  Click here to check them out</p>'
            + '</div>'
          + '</div>'
          + '<div class = "leftWell aboutWell well well-large">'
            + '<legend class = "sectionHead"><h1><a style = "color: black" href = "NDAboutUs.html">About Us</a></h1></legend>'
            + '<div class = "content aboutContent">'
              + '<h5>Contact Info</h5>'
              + '<p>Email: nd_president@mit.edu.</p>'
              + '<h5>Location</h5>'
              + '<p>460 Beacon Street</p>'
              + '<p>Boston, Massachusetts, 02115</p>'
              + '<a href="https://maps.google.com/maps?q=460+Beacon+Street,+Boston,+MA&hl=en&sll=42.351474,-71.087816&sspn=0.006684,0.016512&oq=460+Beacon+Street+&t=h&hnear=460+Beacon+St,+Boston,+Suffolk,+Massachusetts+02115&z=17&iwloc=A">'
                + '<img id = "locationImg" src = "Images/LocationMapsPic.jpg">'
              + '</a>'
            + '</div>'
          + '</div>'
        + '</div>')
  $("#mainContainer").append(content);
  $(".well").css("opacity", 1);
  $(".presTitle").css("opacity", 1).css("font-size", "38.5px");
  $(".section").css("height", "auto").css("margin-top", "20px");
  $(".content").css("height", "auto")
  $(".well").css("height", "auto")
}

function addMonthsAndEventsInOrder(){
  
  var monthArray =  ["January", "February", "March", "April", "May", "June", "July", "August", "September",  "October", "November", "December"];
  var date = new Date();
  var monthNum = date.getMonth();
  var yearNum = date.getFullYear();

  var eventMonthArray = [];
  for (var i in brotherEvents){
    eventMonthArray.push(brotherEvents[i].Month)
  }
  var monthEventIndex = eventMonthArray.indexOf(monthArray[monthNum]);
  
  for (var i = monthNum; i <= 11; i++){
    var month = monthArray[i];
    var newMonth = $('<div class = "' + month + '"></div>');
    var newMonthHeader = $('<legend class = "monthText"></legend>');

    private.monthsWithEvents.push(month);
    newMonth.append(newMonthHeader);
    
    $(".eventsContent").append(newMonth);
    addEventsToMonths(month);
    // console.log(newMonth.children().length);
    if (newMonth.children().length !== 1){            
      newMonthHeader.append(month);
    }else{
      newMonth.html("")
    }      
  }    
  for (var i = 0; i < monthNum; i++){
    var month = monthArray[i];
    var newMonth = $('<div class = "' + month + '"></div>');
    var newMonthHeader = $('<legend class = "monthText"></legend>');

    private.monthsWithEvents.push(month);
    newMonth.append(newMonthHeader);
    
    $(".eventsContent").append(newMonth);
    addEventsToMonths(month);
    
    if (newMonth.children().length !== 1){      
      newMonthHeader.append(month);
    }else{
      newMonth.html("")
    }  
  }
}


function addEventsToMonths(month){
  var monthArray =  ["January", "February", "March", "April", "May", "June", "July", "August", "September",  "October", "November", "December"];
  if (private.monthsWithEvents.indexOf(month) != -1){
    private.monthsWithEvents.push(month);
  }

  var date = new Date();
  var monthNum = date.getMonth();
  var yearNum = date.getFullYear();
  // console.log("currentMonthNum: " + monthNum);
  // console.log("currentMonth: " + monthArray[monthNum]);

  var eventMonthArray = [];
  for (var i in brotherEvents){
    eventMonthArray.push(brotherEvents[i].Month)
  }
    
    var monthEventIndex = eventMonthArray.indexOf(monthArray[monthNum])
    for (var i = 0; i <= brotherEvents.length -1; i++){
      // console.log("month: " + month + "_|_yearNum: " + yearNum + "_|_brotherEventsYear: " + brotherEvents[i].Year)
      if (month == brotherEvents[i].Month && ( (yearNum == parseInt(brotherEvents[i].Year) && monthNum <= brotherEvents[i].MonthNum) || (yearNum < parseInt(brotherEvents[i].Year)) ) ){

          var newEvent = $('<div class = "monthEvents"></div>');
          var newEventTitle = $('<h4 class = "eventTitle"></h4>');
          var newEventDate = $('<h6 class = "eventDate"></h6>');
          var newEventTime = $('<h6 class = "eventTime"></h6>');
          var newEventLocation = $("<h6 class = 'eventLocation'></h6>")
          var newEventDescription = $('<p class = "eventDescription"></p>');
          newEvent.append(newEventTitle, newEventDate, newEventTime);
          if(brotherEvents[i].Location != ""){
            newEvent.append(newEventLocation);
          }
          newEvent.append(newEventDescription);

          newEventTitle.append(brotherEvents[i].Name);
          newEventDate.append(brotherEvents[i].DayOfWeek + ", " + brotherEvents[i].Month + " " + brotherEvents[i].Day + " " + brotherEvents[i].Year);
          newEventTime.append(brotherEvents[i].Time);
          newEventLocation.append(brotherEvents[i].Location)
          newEventDescription.append(brotherEvents[i].Description);

          var newEventMonth = brotherEvents[i].Month;
          $("." + month).append(newEvent);
          if (brotherEvents[i].TypeOf == "Rush"){
            newEvent.attr("id", brotherEvents[i].TypeOf)
            newEvent.css("background-color", "#ffc4c4");
          }else if(brotherEvents[i].TypeOf == "CPW"){
            newEvent.attr("id", brotherEvents[i].TypeOf)
            newEvent.css("background-color", "#cdccff");
          }else if(brotherEvents[i].TypeOf == "Other Events"){
            newEvent.attr("id", brotherEvents[i].TypeOf)
            newEvent.css("background-color", "#d7ffc4");
          }
        
      }
    }
  /*}*/
}



(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

$(document).ready(function(){
  
  // Setting up sizing and positioning of elements

  if ($(window).width() < 1100){
    eventsPageSmallScreen();
    addMonthsAndEventsInOrder();
  }else{
    eventsPageWideScreen();
    addMonthsAndEventsInOrder();
  }

  $(window).resize(function(){

    if ($(window).width() < 1100){
      eventsPageSmallScreen();
      addMonthsAndEventsInOrder();
      eventsClick();
      eventsHover();
    }else{
      eventsPageWideScreen();
      addMonthsAndEventsInOrder();
      eventsClick();
      eventsHover();

      $(".container-fluid").css("width", $(".container-fluid").width());
      $(".container-fluid").css("position", "relative").css("margin-left", "auto").css("margin-right", "auto").css("display", "block");

       // Left Section
      $(".eventsWell").height($(".section").height() - (parseInt($(".section").css("padding"))) - (parseInt($(".eventsWell").css("padding")) * 2))
      $(".eventsContent").height($(".eventsWell").height() - $(".eventsWell legend").height() - parseInt($(".eventsWell legend").css("margin-bottom")) - $(".eventsWell .row").height());

      // Middle Section
      $(".wordPresWell").height($(".section").height() - (parseInt($(".section").css("padding")) * 2) - $(".wordPresSection legend").height() - parseInt($(".wordPresSection legend").css("margin-bottom")) - (parseInt($(".wordPresWell").css("padding")) * 2))
      $(".wordPresTextContainer").height($(".wordPresWell").height() - (parseInt($(".wordPresWell").css("padding")) * 2) - $(".wordPresWell legend").height() - parseInt($(".wordPresWell legend").css("margin-bottom")) - $(".wordPresWell h3").height())

      // Right Section
      $(".leftWell").height($(".section").height() * 0.42);
      $(".brosContent").height($(".leftWell").height() - (parseInt($(".leftWell").css("padding"))) - $(".leftWell legend").height() - parseInt($(".leftWell legend").css("margin-bottom")))
      $(".aboutContent").height($(".leftWell").height() - (parseInt($(".leftWell").css("padding"))) - $(".leftWell legend").height() - parseInt($(".leftWell legend").css("margin-bottom")))
    }
  })

  

  
  
  eventsClick();
  eventsHover();
  
  
});