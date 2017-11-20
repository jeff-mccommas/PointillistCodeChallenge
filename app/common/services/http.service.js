/*jslint browser:true*/
/*global angular*/
function http_service($q, $http) {
    "use strict";
    var content = {};
    content.http_get = function (url) {
        var deferred = $q.defer();
        $http.get(url, {
            headers: {
                "Content-Type": "text/xml"
            }
        }).then(function (response) {
            if (response) {
                deferred.resolve(response.data);
            } else {
                deferred.resolve(null);
            }
            return deferred.promise;
        }, function () {
            deferred.resolve(null);
        });
        return deferred.promise;
    };
    return content;
}
angular.module("pgApp").service("http_service", ["$q", "$http", http_service]);
