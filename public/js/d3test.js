/*
 * TungDT - Start
 */

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//data generator
function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}

//Pie chart example data. Note how there is only a single array of key-value pairs.
function exampleData() {
  return  [
      { 
        "label": "One",
        "value" : 29.765957771107
      } , 
      { 
        "label": "Two",
        "value" : 0
      } , 
      { 
        "label": "Three",
        "value" : 32.807804682612
      } , 
      { 
        "label": "Four",
        "value" : 196.45946739256
      } , 
      { 
        "label": "Five",
        "value" : 0.19434030906893
      } , 
      { 
        "label": "Six",
        "value" : 98.079782601442
      } , 
      { 
        "label": "Seven",
        "value" : 13.925743130903
      } , 
      { 
        "label": "Eight",
        "value" : 5.1387322875705
      }
    ];
}

$(document).ready(function(){
	/*
   * d3js test
   */
  
  /*var spaceCircles = [30, 70, 110];
  
  var svgContainer = d3.select(".svg-image").append("svg")
                                      .attr("width", 600)
                                      .attr("height", 400);
  
  var circles = svgContainer.selectAll("circle")
                            .data(spaceCircles)
                            .enter()
                            .append("circle");
 
  var circleAttributes = circles
                        .attr("cx", function (d) { return d; })
                        .attr("cy", function (d) { return d; })
                        .attr("r", 20 )
                        .style("fill", function(d) {
                          var returnColor;
                          if (d === 30) { returnColor = "green";
                          } else if (d === 70) { returnColor = "purple";
                          } else if (d === 110) { returnColor = "red"; }
                          return returnColor;
                        });
  
  var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                   { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                   { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
  
  //This is the accessor function we talked about above
  var lineFunction = d3.svg.line()
                           .x(function(d) { return d.x; })
                           .y(function(d) { return d.y; })
                           .interpolate("basis");
  
  var gele = svgContainer.append("g")
  						.attr("transform", "translate(50) scale(1.2)");//<g transform="translate(...)">
  
  var lineGraph = gele.append("path")
                              .attr("d", lineFunction(lineData))
                              .attr("stroke", "blue")
                              .attr("stroke-width", 2)
                              .attr("fill", "none");
  
//Create the Scale we will use for the Axis
  var axisScale = d3.scale.linear()
                           .domain([0, 200])
                           .range([0, 500]);
 
 //Create the Axis
 var xAxis = d3.svg.axis()
                    .scale(axisScale);
 
 
 //Create an SVG group Element for the Axis elements and call the xAxis function
 var xAxisGroup = svgContainer.append("g")
                               .call(xAxis);*/
 
  
 // new tutorial
 //var data = [4, 8, 15, 16, 23, 42];
 
	data = [
	         {name: "Locke",    value:  4},
	         {name: "Reyes",    value:  8},
	         {name: "Ford",     value: 15},
	         {name: "Jarrah",   value: 16},
	         {name: "Shephard", value: 23},
	         {name: "Kwon",     value: 42}
	       ];
	
	var margin = {top: 20, right: 0, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	x = d3.scale.ordinal()
	 .rangeRoundBands([0, width], .1);
	
	y = d3.scale.linear()
	 .range([height, 0]);
	
	var xAxis = d3.svg.axis()
	 .scale(x);
	 //.orient("bottom");
	
	var yAxis = d3.svg.axis()
	 .scale(y)
	 .orient("left").ticks(10, "%");
	
	var chart = d3.select(".chart")
	 .attr("width", width + margin.left + margin.right)
	 .attr("height", height + margin.top + margin.bottom)
	.append("g")
	 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	x.domain(data.map(function(d) { return d.name; }));
	y.domain([0, d3.max(data, function(d) { return d.value; })]);
	
	chart.append("g")
	   .attr("class", "x axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);
	
	chart.append("g")
	   .attr("class", "y axis")
	   .call(yAxis)
	   .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");
	
	chart.selectAll(".bar")
	   .data(data)
	 .enter().append("rect")
	   .attr("class", "bar")
	   .attr("x", function(d) { return x(d.name); })
	   .attr("y", function(d) { return y(d.value); })
	   .attr("height", function(d) { return height - y(d.value); })
	   .attr("width", x.rangeBand());


    //force layout
	width = 960;
	height = 500;
	
	var fill = d3.scale.category10();
	
	nodes = d3.range(3).map(function(i) {
		return {ind: i};
	});
	
	nodes = [
    {
    	"nodeid": 1,
    	"name": "ABC",
    	"size": 10,
    	"class": "A",
    	"type": 1
	},
	{
    	"nodeid": 2,
    	"name": "DEF",
    	"size": 15,
    	"class": "C",
    	"type": 1
	},
	{
    	"nodeid": 3,
    	"name": "GHI",
    	"size": 20,
    	"class": "B",
    	"type": 1
	}];
	
	links = [
    {
    	"edgeid": 1,
		"source": nodes[0],
		"target": nodes[1],
		"class": "A",
		"type": 0,
		"weight": 10
	},{
    	"edgeid": 2,
		"source": nodes[0],
		"target": nodes[2],
		"class": "C",
		"type": 0,
		"weight": 10
	},{
    	"edgeid": 3,
		"source": nodes[1],
		"target": nodes[2],
		"class": "B",
		"type": 0,
		"weight": 10
	}];
	
	//var colors = ["green", "blue", "red"];
	
	var colors = d3.scale.ordinal()
    .domain(["A", "B", "C"])
    .range(["green", "blue", "red"]);
	
	/*var links = d3.range(5).map(function(i) {
		var len = nodes.length;
		return {source: nodes[getRandomInt(0, len)], target: nodes[getRandomInt(0, len)]};
	});*/
	
	var force = d3.layout.force()
	.nodes(nodes)
	.links(links).linkDistance(100)
	.size([width, height])
	.on("tick", tick)
	.start();
	
	var svg = d3.select(".svg-image").append("svg")
	.attr("width", width)
	.attr("height", height);
	
	var link = svg.selectAll(".link")
	.data(links)
	.enter().append("line")
	.attr("class", "link")
	.style("stroke-dasharray","5")
	.style("stroke", "black");
	
	var node = svg.selectAll(".node")
	.data(nodes)
	.enter().append("circle")
	.attr("class", "node")
	.attr("cx", function(d) { return d.x; })
	.attr("cy", function(d) { return d.y; })
	.attr("r", function(d, i) { return d.size; })
	.style("fill", function(d, i) { return colors(d.class); })
	.style("stroke", function(d, i) { return "green"; })
	.style("stroke-width", 4)
	.call(force.drag)
	.on("mousedown", function() { d3.event.stopPropagation(); });
	
	//console.log(nodes);
	
	
	
	svg.style("opacity", 1e-6)
	.transition()
	.duration(1000)
	.style("opacity", 1);
	
	d3.select("body").on("mousedown", mousedown);
	
	function tick(e) {
	
		// Push different nodes in different directions for clustering.
		var k = 10 * e.alpha;
		nodes.forEach(function(o, i) {
			//o.y += i & 1 ? k : -k;
			//o.x += i & 2 ? k : -k;
			//o.x += i%2 == 0 ? k : -k;
			//o.y += i%2 == 0 ? k : -k;
		});
		
		node.attr("cx", function(d) { return d.x; })
		  .attr("cy", function(d) { return d.y; });
		
		link
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
		
		//console.log(nodes[0].x + " " + nodes[0].y);
	}
	
	function mousedown() {
		nodes.forEach(function(o, i) {
		o.x += (Math.random() - .5) * 40;
		o.y += (Math.random() - .5) * 40;
		});
		force.resume();
	}
 
	
	//nvd3
	//These lines are all chart setup.  Pick and choose which chart features you want to utilize. 
	nv.addGraph(function() {
	  var chart = nv.models.lineChart()
	                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
	                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
	                .transitionDuration(350)  //how fast do you want the lines to transition?
	                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
	                .showYAxis(true)        //Show the y-axis
	                .showXAxis(true)        //Show the x-axis
	  ;

	  chart.xAxis     //Chart x-axis settings
	      .axisLabel('Time (ms)')
	      .tickFormat(d3.format(',r'));

	  chart.yAxis     //Chart y-axis settings
	      .axisLabel('Voltage (v)')
	      .tickFormat(d3.format('.02f'));

	  // Done setting the chart up? Time to render it!
	  var myData = sinAndCos();   //You need data...

	  d3.select('.nvd3')    //Select the <svg> element you want to render the chart in. 
	  	  .attr("height", 500)
	      .datum(myData)         //Populate the <svg> element with chart data...
	      .call(chart);          //Finally, render the chart!

	  //Update the chart when window resizes.
	  nv.utils.windowResize(function() { chart.update(); });
	  return chart;
	});
	
	//Regular pie chart example
	nv.addGraph(function() {
	  var chart = nv.models.pieChart()
	      .x(function(d) { return d.label; })
	      .y(function(d) { return d.value; })
	      .showLabels(true);

	    d3.select("#chart svg")
	        .datum(exampleData())
	        .transition().duration(350)
	        .call(chart);

	  return chart;
	});

	//Donut chart example
	nv.addGraph(function() {
	  var chart = nv.models.pieChart()
	      .x(function(d) { return d.label })
	      .y(function(d) { return d.value })
	      .showLabels(true)     //Display pie labels
	      .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
	      .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
	      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
	      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
	      ;
	
	    d3.select(".nvd3-pie")
	        .datum(exampleData())
	        .attr("height", 500)
	        .transition().duration(350)
	        .call(chart);
	
	  return chart;
	});
});

var x, y, data, nodes;