/*jslint browser:true*/
/*global angular*/

// Declare all constant variables here
angular.module("pgApp").constant("Globals", {
    serviceBaseURL: "http://127.0.0.1:3000/",
    "NoGraphData": "No Data Available.",
    "Graphs": {
        "areaChart": "areaChart",
        "barChart": "barChart",
        "pieChart": "pieChart",
        "lineChart": "lineChart",
        "donutChart": "donutChart"
    },
    "List": {
        "Graph": [
            {
                "key": "lineChart",
                "active": true,
                "value": "Line Chart"
            },
            {
                "key": "barChart",
                "active": true,
                "value": "Bar Chart"
            },
            {
                "key": "areaChart",
                "active": true,
                "value": "Area Chart"
            },
            {
                "key": "pieChart",
                "active": true,
                "value": "Pie Chart"
            },
            {
                "key": "donutChart",
                "active": true,
                "value": "Donut Chart"
            }
        ],
        "Cohort": [
            {
                "key": "product",
                "value": "Product"
            },
            {
                "key": "category",
                "value": "Category"
            }, {
                "key": "channel",
                "value": "Channel"
            }
        ],
        "Statistic": [
            {
                "key": "count",
                "value": "Count"
            },
            {
                "key": "sum",
                "value": "Sum"
            }
        ],
        "OrderBy": [
            {
                "key": "atoz",
                "value": "A to Z"
            },
            {
                "key": "ztoa",
                "value": "Z to A"
            },
            {
                "key": "mintomax",
                "value": "Min to Max"
            },
            {
                "key": "maxtomin",
                "value": "Max to Min"
            }
        ]
    }
});
