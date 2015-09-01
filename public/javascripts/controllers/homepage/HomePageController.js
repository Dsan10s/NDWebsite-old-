var ndapp = angular.module('ndapp');

ndapp.controller('homepageController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {
    datesWithEvents: [], 
    futureEvents: {}
  }

  var setViewModel = function() {
    $scope.$apply(function() {
      var futureEvents = helpers.getFutureEvents();
      public.datesWithEvents = Object.keys(futureEvents);
      public.futureEvents = futureEvents;
    });
  }

  // Private ////////////////////////////////////////////////////////

  var events_ = [];

  var helpers = (function() {

    /**
     *
     *
     */
    function getFutureEvents() {
      var futureEvents = {};
      for (var i = 0; i < events_.length; i++) {
        var thisEvent = events_[i];
        var thisDate = thisEvent.dateString;
        var month = moment(thisDate).format('MMMM');
        
        var now = Date.parse(new Date());

        var thisMoment = moment(thisDate, "MM/DD/YY");
        var nowMoment = moment(now);

        var titleDate = moment(thisMoment).format('ddd, MMMM Do');

        var isFuture = (thisMoment.diff(nowMoment, 'seconds') >= -(60 * 60 * 24));

        if (isFuture) {
          if (thisEvent.type == "Rush") {
            if (thisMoment.diff(nowMoment, 'd') < 7) {
              if (!(titleDate in futureEvents)) {
                futureEvents[titleDate] = [];
              }
              thisEvent.moment = moment(thisMoment).format('dddd MMMM Do YYYY');
              futureEvents[titleDate].push(thisEvent);
            }
          } else {
            if (!(titleDate in futureEvents)) {
              futureEvents[titleDate] = [];
            }
            thisEvent.moment = moment(thisMoment).format('dddd MMMM Do YYYY');
            futureEvents[titleDate].push(thisEvent);
          }
        }
      }
      return futureEvents;
    }

    /**
     *
     *
     */
    function sizingJS() {}

    /**
     *
     *
     */
    function responsiveJS() {
      sizingJS();
    }

    return {
      getFutureEvents: getFutureEvents, 
      sizingJS: sizingJS, 
      responsiveJS: responsiveJS
    }
  })();

  var init = (function() {
    ndService.ajax.eventsDeferred().done(function(data) {
      events_ = data.events;

      setViewModel();


      helpers.sizingJS();
      $(window).resize(function() {
        helpers.responsiveJS();
      });

      eventHandlers();
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

    $("body").one("mousemove", function() {

      // A very hacky way of initializing nanoscroller at the right time
      ndService.nanoScrollerInit();
    });
  }

});