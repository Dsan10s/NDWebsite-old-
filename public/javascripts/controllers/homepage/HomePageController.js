var ndapp = angular.module('ndapp');

ndapp.controller('homepageController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {
    windowWidth: $(window).width(), 
    monthsWithEvents: [], 
    futureEvents: {}
  }

  var setViewModel = function() {
    $scope.$apply(function() {
      var futureEvents = getFutureEvents();
      public.monthsWithEvents = Object.keys(futureEvents);
      public.futureEvents = futureEvents;
    });
  }

  // Private ////////////////////////////////////////////////////////

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
      events: []
    }
  })();

  var helpers = (function() {

    function sizingJS() {}

    function responsiveJS() {
      sizingJS();
    }

    return {
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {
    ndService.ajax.eventsDeferred().done(function(data) {
      private.events = data.events;

      setViewModel();
      eventHandlers();
      enableNewCssAnimations();

      // helpers.animateIntro();

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
      }
    }, ".monthEvent");

    // Tooltips

    $(".aboutFooter #facebookCol .aboutImg").tooltip({
      title: "Facebook", 
      trigger: "hover", 
      placement: "top"
    })
  }

  function getFutureEvents() {
    var futureEvents = {};
    for (var i = 0; i < private.events.length; i++) {
      var thisEvent = private.events[i];
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

});