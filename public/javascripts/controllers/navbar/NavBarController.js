var ndapp = angular.module('ndapp');

ndapp.controller('navbarController', function($scope, ndService) {

  // Public /////////////////////////////////////////////////////////

  var public = $scope.viewModel = {
    address: ndService.vars.address, 
    isHomepage: undefined, 
    urlAddress: undefined, 
    links: [{"text": "Home", 
             "href": "/home", 
             "icon": "home"
            }, 
            {"text": "Brothers", 
             "href": "/brothers", 
             "icon": "user"
            }, 
            {"text": "House", 
             "href": "/house", 
             "icon": "tower"
            }, 
            {"text": "About Us", 
             "href": "#", 
             "dataToggle": "modal", 
             "dataTarget": "#aboutModal", 
             "icon": "globe"
            }], 
    adminLinks: [{"text": "Admin Home", 
                  "href": "/admin", 
                  "icon": "dashboard"
                 }, 
                 {"text": "Event Editor", 
                  "href": "/admin/editEvents", 
                  "icon": "tasks"}]
  };

  var setViewModel = function() {
    public.urlAddress = helpers.createGmapsAddress(public.address);
    public.isHomepage = isHomepage();
  };

  // Private ////////////////////////////////////////////////////////

  var helpers = (function() {
    function createGmapsAddress(addressString) {
      var gmapsAddressArray = addressString.split(" ");
      var gmapsAddress = "";
      for (var i = 0; i < gmapsAddressArray.length; i++) {
        var word = gmapsAddressArray[i];
        if (i != 0) {
          gmapsAddress += "+";
        }
        gmapsAddress += word;
      }

      return gmapsAddress;
    }

    return {
      createGmapsAddress: createGmapsAddress
    }
  })();

  setViewModel();
  var init = (function() {
    eventHandlers();
  })();

  function eventHandlers() {}

  function isHomepage() {
    var url = navbarViewVars.url;
    if (url == "/" || url == "/home") {
      return true;
    }
  }
});