/*jslint browser:true*/
/*global d3, angular*/
function dataExplorerChart(Globals) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            graphData: "=graphData",
            settings: "=",
            chartApi: "="
        },
        template: "<div id='{{settings.graph.key}}' class='svg-container'></div>",
        link: function (scope) {
            var settings;
            scope.chartApi = {};
            var tip = d3.tip().attr("class", "d3-tip").offset([-10, 0]).html(function (d) {
                return "<strong>" + d.label + ":</strong> <span>" + d.value + "</span>";
            });
            function getAxis(width, height) {
                return {
                    x: d3.scalePoint().range([0, width]).padding(0.2),
                    y: d3.scaleLinear().range([height, 0])
                };
            }

            function init(sourceData) {
                var svg;
                var svgHeight;
                var svgWidth;
                var bncharts;
                var margin = {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50
                };

                if (!sourceData) {
                    return;
                }
                svgWidth = 600;
                svgHeight = 500;

                var color = d3.scaleOrdinal().domain(sourceData.map(function (entry) {
                    return entry.label;
                })).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
                var axisScales = getAxis(svgWidth, svgHeight);
                axisScales.x.domain(sourceData.map(function (entry) {
                    return entry.label;
                }));
                axisScales.y.domain([0, d3.max(sourceData, function (d) {
                    return d.value;
                })]);
                //Creating SVG Container Element
                svg = d3.select("#" + settings.graph.key).append("svg")
                    .attr("width", svgWidth + margin.left + margin.right)
                    .attr("height", svgHeight + margin.top + margin.bottom) //class to make it responsive
                    .classed("svg-content-responsive", true);
                bncharts = svg.append("g").classed("bncharts", true).attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                function drawAxis() {
                    bncharts.append("g")
                        .attr("class", "y axis")
                        .call(d3.axisLeft(axisScales.y).tickSize(-svgWidth).ticks(5));
                    bncharts.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + svgHeight + ")")
                        .call(d3.axisBottom(axisScales.x));
                }

                function drawLineChart(isArea) {
                    var line = d3.line()
                        .defined(function (d) {
                            return d.value !== null;
                        })
                        .x(function (d) {
                            return axisScales.x(d.label);
                        })
                        .y(function (d) {
                            return axisScales.y(d.value);
                        })
                        .curve(d3.curveMonotoneX);
                    var area = d3.area()
                        .curve(d3.curveMonotoneX)
                        .defined(function (d) {
                            return d.value !== null;
                        })
                        .x(function (d) {
                            return axisScales.x(d.label);
                        })
                        .y0(svgHeight)
                        .y1(function (d) {
                            return axisScales.y(d.value);
                        });
                    drawAxis();
                    // Create an axis component with d3.axisBottom
                    bncharts.append("path")
                        .datum(sourceData)
                        .attr("class", "line")
                        .attr("d", line);
                    if (isArea) {
                        bncharts.append("path")
                            .datum(sourceData)
                            .attr("class", "line line-area") // Assign a class for styling
                            .attr("d", area);
                    }
                    bncharts.selectAll(".dot")
                        .data(sourceData)
                        .enter()
                        .append("circle")
                        .attr("class", "dot")
                        .attr("cx", function (d) {
                            return axisScales.x(d.label);
                        })
                        .attr("cy", function (d) {
                            return axisScales.y(d.value);
                        })
                        .attr("r", 10)
                        .on("mouseover", tip.show)
                        .on("mouseout", tip.hide);
                    bncharts.call(tip);
                }

                function drawBarChart() {
                    drawAxis();
                    var bar = bncharts.selectAll(".bar")
                        .data(sourceData)
                        .enter();

                    bar.append("rect")
                        .attr("fill", function (d) {
                            return color(d.label);
                        })
                        .attr("class", "bar")
                        .attr("x", function (d) {
                            return axisScales.x(d.label) - 15;
                        })
                        .attr("y", function (d) {
                            return axisScales.y(d.value);
                        })
                        .attr("width", 30)
                        .attr("height", function (d) {
                            return svgHeight - axisScales.y(d.value);
                        })
                        .on("mouseover", tip.show)
                        .on("mouseout", tip.hide);
                        // removed data:
                    bncharts.call(tip);
                }

                function drawPieChart(isDonut) {
                    var radius = Math.min(svgWidth, svgHeight) / 2;
                    var pie = d3.pie()
                        .sort(null)
                        .value(function (d) {
                            return d.value;
                        });

                    var pathPie = d3.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(isDonut
                            ? radius - 80
                            : 0);
                    var arcOver = d3.arc()
                        .outerRadius(radius + 5)
                        .innerRadius(isDonut
                            ? radius - 80
                            : 0);
                    var label = d3.arc()
                        .outerRadius(radius - 40)
                        .innerRadius(radius - 40);
                    bncharts.attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");
                    var arc = bncharts.selectAll(".arc")
                        .data(pie(sourceData))
                        .enter().append("g")
                        .attr("class", "arc");

                    arc.append("path")
                        .attr("d", pathPie)
                        .attr("fill", function (d) {
                            return color(d.data.label);
                        })
                        .attr("stroke", function (d) {
                            return color(d.data.label);
                        })
                        .on("mouseenter", function () {
                            d3.select(arguments[2][arguments[1]])
                                .attr("stroke", "white")
                                .transition()
                                .duration(500)
                                .attr("d", arcOver)
                                .attr("stroke-width", 6);
                        })
                        .on("mouseleave", function () {
                            d3.select(arguments[2][arguments[1]]).transition()
                                .attr("d", pathPie)
                                .attr("stroke", "none");
                        });

                    arc.append("text")
                        .attr("transform", function (d) {
                            return "translate(" + label.centroid(d) + ")";
                        })
                        .attr("dy", "0.35em")
                        .text(function (d) {
                            return d.data.label + ": " + d.data.value;
                        });
                }
                if (settings.graph.key === Globals.Graphs.lineChart) {
                    drawLineChart(false);
                } else if (settings.graph.key === Globals.Graphs.barChart) {
                    drawBarChart();
                } else if (settings.graph.key === Globals.Graphs.areaChart) {
                    drawLineChart(true);
                } else if (settings.graph.key === Globals.Graphs.pieChart) {
                    drawPieChart();
                } else if (settings.graph.key === Globals.Graphs.donutChart) {
                    drawPieChart(true);
                }
            }

            function cleanGridViewChart() {
                d3.selectAll("svg").remove();
            }

            function startRendering(data) {
                if (data) {
                    cleanGridViewChart();
                    init(data);
                }
            }
            //Call this function too redraw the chart
            scope.chartApi.refresh = function (data, settingObj) {
                settings = settingObj;
                // softDraw = softDrawValue;
                startRendering(data);
            };
        }
    };
}


angular.module("pgApp").directive("explorerChart", ["Globals", dataExplorerChart]);
