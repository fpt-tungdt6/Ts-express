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
  var tstable = $("#ts-table").timesheetTable();
  
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