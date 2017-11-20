/*jslint browser:true*/
/*global angular,d3*/
function dashboardUtility($q, Globals, http_service) {
    "use strict";
    var content = {};
    function buildRequestUrl(settings) {
        var requestQueryParameters = [];
        if (settings.cohort.key) {
            requestQueryParameters.push("cohort=" + settings.cohort.key);
        }
        if (settings.cohort.key) {
            requestQueryParameters.push("stat=" + settings.stat.key);
        }
        return Globals.serviceBaseURL + requestQueryParameters.join("&");
    }

    function processData(data, settings) {
        switch (settings.order.key) {
        case "atoz":
            data.sort(function (a, b) {
                return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
            });
            break;
        case "ztoa":
            data.sort(function (a, b) {
                return b.label.toLowerCase().localeCompare(a.label.toLowerCase());
            });
            break;
        case "mintomax":
            data.sort(function (a, b) {
                return a.value - b.value;
            });
            break;
        case "maxtomin":
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            break;

        }
        return data;
    }
    content.getInitData = function (settings) {
        var deferred = $q.defer();
        http_service.http_get(buildRequestUrl(settings)).then(function (response) {
            deferred.resolve(processData(response, settings));
            return deferred.promise;
        });
        return deferred.promise;
    };
    return content;
}
angular.module("pgApp").service("dashboardUtility", ["$q", "Globals", "http_service", dashboardUtility]);
