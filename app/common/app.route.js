/*jslint browser:true*/
/*global angular*/
angular.module("pgApp").config(function ($stateProvider, $urlRouterProvider) {
    "use strict";
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("dashboard", {
            url: "/",
            reloadOnSearch: false,
            views: {
                "content": {
                    templateUrl: "components/dashboard/dashboard.html",
                    controller: "dashboardCtrl as dashboard"
                }
            }
        });
});
