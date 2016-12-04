(function () {
    'use strict';

    angular.module('main.directives')
        .directive('choropleth', ['d3', 'color_convert', function (d3, cc) {
            return {
                restrict: 'EA',
                scope: {
                    data: "=",
                    modeList: "=",
                    activeMode: "="
                },
                link: function (scope, iElement, iAttrs) {

                    var width = 900,
                        height = 480,

                    //zoom variables
                        centered,
                        active;

                    var quantize = d3.scale.quantize()
                        .domain([0, .15])
                        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

                    var projection = d3.geo.albersUsa()
                        .scale(1280)
                        .translate([width / 2, height / 2]);

                    var path = d3.geo.path()
                        .projection(projection);

                    var zoom = d3.behavior.zoom()
                        .center([width/2, height/2])
                        .scaleExtent([.8,.8])
                        .on("zoom", zoomed);

                    function zoomed() {
                        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    }

                    var svg = d3.select(iElement[0])
                            .append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .append('g')
                        ;

                    var container = svg.append("g");

                    queue()
                        .defer(d3.json, "data/all-id.json")
                        .defer(d3.csv, "data/zip3.csv")
                        .defer(d3.json, "data/stateAgr.json")
                        .await(ready);

                    function ready(error, us, zc, sa) {
                        if (error) throw error;

                        var zipCodes = {};

                        zc.forEach(function(d) { zipCodes[d.Id] = d.Name; });

                        var cnt = 0;
                        container.append("g").attr("class", "allZones");

                        d3.select(".allZones")
                            .append("g")
                            .attr("class", "zones")
                            .selectAll("path")
                            .data(topojson.feature(us, us.objects.zip3).features)
                            .enter().append("path")
                            .attr("stroke-width", 1)
                            .attr("stroke", "white")
                            .attr("class", function(d) {
                                var location_name = zipCodes[d.properties.ZIP];
                                if(typeof location_name == "string"){
                                    location_name = location_name.substr(location_name.length-2, 2);
                                }
                                return "cZones " + location_name + " " + d.properties.ZIP })
                            .attr("loc", function(d) {
                                return zipCodes[d.properties.ZIP] })
                            .attr("d", path)
                            //.style("z-index", 0)
                            .on("click", clicked)
                        ;

                        d3.select(".allZones")
                            .append("g")
                            .attr("class", "stateZones")
                            .selectAll("path")
                            .data(topojson.feature(us, us.objects.tl_2010_us_state10).features)
                            .enter().append("path")
                            //.style("z-index", 1)
                            .attr("class", "stateZone")
                            .attr("id", function(d){return d.properties.STUSPS10})
                            .attr("d", path)
                            .attr("ts", function(d){return sa[d.properties.STUSPS10].total_streams})
                            .attr("tc", function(d){return sa[d.properties.STUSPS10].total_customers})
                            .attr("pop", function(d){return sa[d.properties.STUSPS10].population})
                            .style("fill", function(d){
                                var saturation = sa[d.properties.STUSPS10].total_streams / 30000000 * 100;
                                return "hsl(37, " + saturation + "%, 55%)";
                            })
                            .on("click", clicked)
                            //.on("mouseover", hovering)
                            //.on("mouseout", notHovering)
                        ;

                        container.append("path")
                            .datum(topojson.mesh(us, us.objects.tl_2010_us_state10, function(a, b) { return a !== b; }))
                            .attr("class", "states")
                            .attr("d", path);

                        container
                            .transition()
                            .duration(500)
                            .attr("transform", function(){
                                var translate = "50,50";
                                var scale = ".8,.8";
                                return "translate(" + translate + ")scale(" + scale + ")";
                            })
                        ;
                    }

                    function clicked(d){

                        var x, y, k;

                        if (d && centered !== d && this.getAttribute("id") != null) {
                            var centroid = path.centroid(d);
                            x = centroid[0];
                            y = centroid[1];
                            k = 4;
                            centered = d;
                            active = this.getAttribute("id");

                            $("."+active)
                                .attr("hidden", false)
                            ;

                            $("#"+active)
                                .attr("hidden", true)
                            ;
                        } else {
                            x = width / 2;
                            y = height / 2;
                            k = 1;
                            centered = null;

                            $("."+active)
                                .attr("hidden", true)
                            ;

                            $("#"+active)
                                .attr("hidden", false)
                            ;
                            active = null;
                        }

                        container.selectAll(".zones path")
                            .classed("active", centered && function(d) { return d === centered; });

                        container.selectAll("path")
                            .transition()
                            .duration(750)
                            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                            .style("stroke-width", 1.5 / k + "px");
                    }

                    // define render function
                    function render(data){
                        if(data != undefined){
                            for(var zip in data){
                                if(  !/^[0-9]+$/.test(zip)  || zip == ""){
                                    continue;
                                }
                                if ($("."+zip)){

                                    var opac = "1.0";
                                    var value = data[zip].streams;
                                    if(value < 1){
                                        opac = "0.0";
                                    }
                                    else if(value >= 1 && value < 9999){
                                        opac = "0.3";
                                    }
                                    else if(value >= 10000 && value < 49999){
                                        opac = "0.5";
                                    }
                                    else if(value >= 50000 && value < 99999){
                                        opac = "0.8";
                                    }

                                    $("."+zip)
                                        .attr("style", "opacity:"+ opac + "; fill:grey; z-index:0")
                                        .attr("hidden", true)
                                        .attr("streams", value)
                                        .hover(function() {
                                            $(this).css("fill","gold")
                                        }, function(){
                                            $(this).css("fill","grey")
                                        });
                                }
                            }
                        }
                    }

                    //update the color of the choropleth to the corresponding color for the mode
                    function updateMode(c){
                        //get color value from the mode
                        var valueStr = scope.modeList[c]["color"];
                        var values = valueStr.split(",");

                        //change color of map
                        d3.selectAll('.stateZone')
                            .style("fill", function(d){
                                var streams = d3.select(this).attr("ts");
                                var customers = d3.select(this).attr("tc");
                                var population = d3.select(this).attr("pop");

                                var saturation = streams / 30000000 * 100;
                                return "hsl("+ values[0] +", " + saturation + "%, " + values[2]*100 + "%)";
                            })
                        ;
                    }

                    scope.$watch('activeMode', function(newVals, oldVals) {
                        return updateMode(newVals);
                    });

                    scope.$watch('data', function(newVals, oldVals) {
                        return render(newVals);
                    });
                }
            }
        }]);
}());