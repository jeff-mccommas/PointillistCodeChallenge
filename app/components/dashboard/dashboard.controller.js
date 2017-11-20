/*jslint browser: true, this:true*/
/*global angular,saveSvgAsPng, d3, document*/
function dashboardCtrl(Globals, dashboardUtility) {
    "use strict";
    var dashboard = this;
    //Default values of dropdown setting
    dashboard.settings = {
        graph: Globals.List.Graph[0],
        cohort: Globals.List.Cohort[0],
        stat: Globals.List.Statistic[1],
        order: Globals.List.OrderBy[1]
    };
    dashboard.exportgraph = function () {
        var perfGraphEle = document.getElementById("chartContainer");
        var svg;
        var dateTime = new Date();
        dateTime = dateTime.getTime();
        if (perfGraphEle) {
            svg = perfGraphEle.getElementsByTagName("svg")[0];
            saveSvgAsPng(svg, "chart-" + dateTime + ".png");
        }
    };

    dashboard.createGraph = function () {
        dashboard.chartApi.refresh(dashboard.graphData, dashboard.settings);
    };

    dashboard.refreshGraph = function () {
        dashboard.createGraph();
    };


    dashboard.init = function () {
        dashboard.data = null;
        dashboard.isLoading = true;
        dashboardUtility.getInitData(dashboard.settings).then(function (data) {
            dashboard.isLoading = false;
            if (data) {
                dashboard.isData = false;
                dashboard.graphData = data;
                dashboard.refreshGraph();
            } else {
                dashboard.isData = true;
            }
        });
    };
    dashboard.init();
}
angular.module("pgApp").controller("dashboardCtrl", ["Globals", "dashboardUtility", dashboardCtrl]);
