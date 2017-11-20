/*jslint browser:true*/
/*global angular*/
function MainCtrl(Globals) {
    "use strict";
    var mainCtrl = {};
    mainCtrl.loading = true;
    mainCtrl.Config = Globals;
    return mainCtrl;
}
angular.module("pgApp").controller("MainCtrl", ["Globals", MainCtrl]);
