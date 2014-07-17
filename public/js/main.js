/*
 * TungDT - Start
 */

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function(){
	
  // make staff info editable
  $(".staff-info td.value").attr("contenteditable", true);
  
  // datepicker
  var date = new Date();
  var datepicker = $('.form_datetime').datetimepicker({
	  format: 'yyyy-mm',
	  startView: 3,
	  minView: 3,
	  maxView: 4,
	  autoclose: 1
  });
  
  datepicker.datetimepicker('setDate', new Date());
  
  datepicker.on('changeDate', function(e) {
	console.log(e.date.toString());
	console.log( $(this).data("date") );
	//console.log(e.localDate.toString());
	
	tstable.applyMonth( $(this).data("date") );
  });
  
  // create timesheet table html
  //var tstable = $("#ts-table").timesheetTable();
  
  //tstable.applyMonth("2014-05");
  
  
  //io socket
  socket = io('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  
  // initialize a staff
  staff = new Staff("tungdt6", {
	  "name": "Dang Thanh Tung",
	  "contract_type": "ukeoi",
	  "working_site": "fujixerox",
	  "project": "Signage",
	  "standard_working_hour": "8"
  });
  
  //currentTsm = new TimeSheetMonth("tungdt6", datepicker.data("date"), tstable.getData());
  
  $(".okbtn").click(function(){
	  console.log( tstable.getData() );
  });
  
  
  $(".submitbtn").click(function(){
	  console.log("send data...");
	  currentTsm.sendData();
  });
  
  /*
   * d3js test
   */
  var spaceCircles = [30, 70, 110];
  
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
                               .call(xAxis);
 
  
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
 
});

var x, y, data, nodes;

/*global variable*/
var socket, staff, currentTsm;


/*
 * Staff
 * 
 */
var Staffs = {}; //global, mapping staffid to Staff Object 
function Staff(staffid, staffinfo){
	this.staffId = staffid;
	this.staffInfo = staffinfo;
	this.timesheetmonths = [];
	Staffs[staffid] = this;
}

Staff.prototype.addTimesheetmonth = function(tsmonth){
	this.timesheetmonths.push(tsmonth);
};

/*
 * TimeSheetMonth
 */
function TimeSheetMonth(staffid, month, data){
	this.ownerId = staffid;
	this.month = month;
	this.data = data;
	Staffs[staffid].timesheetmonths.push(this);
}

TimeSheetMonth.collectCurrentMonthData = function(){
	var month = $(".form_datetime").data("date");
}

TimeSheetMonth.prototype.sendData = function(){
	socket.emit("timesheetdata", {
		staffid: this.ownerId,
		month: this.month,
		data: this.data
	});
}