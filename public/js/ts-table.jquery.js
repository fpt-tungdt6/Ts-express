/**
 * New node file
 */
(function ( $ ) {
	
	var	defaultData = {
			"headers": [
		        {text: "日", defaultText: "",
		        	attrs: {
		        		"class": "large",
		        		"data-class": "expand",
		        		"data-hide": "", 
		        	}
		        },
		        {text: "曜日", defaultText: "",
		        	attrs: {
		        		"class": "narrow",
		        		"data-class": "",
		        		"data-hide": "", 
		        	}
		        },
		        {text: "休日・祝", defaultText: "",
		        	attrs: {
		        		"class": "normal",
		        		"data-class": "",
		        		"data-hide": "", 
		        	}
		        },
		        {text: "出社", defaultText: "09:00", 
		        	attrs: {
		        		"class": "normal",
		        		"data-class": "",
		        		"data-hide": "", 
		        	},
		        	cellAttrs: {
		        		"class": "time-input",
		        		contenteditable: 'true'
		        	}
		        },
		        {text: "退社", defaultText: "18:00",
		        	attrs: {
		        		"class": "normal",
		        		"data-class": "",
		        		"data-hide": "", 
		        	},
		        	cellAttrs: {
		        		"class": "time-input",
		        		contenteditable: 'true'
		        	}
		        },
		        {text: "休憩", defaultText: "01:00",
		        	attrs: {
		        		"class": "normal",
		        		"data-class": "",
		        		"data-hide": "", 
		        	},
		        	cellAttrs: {
		        		"class": "time-input",
		        		contenteditable: 'true'
		        	}
		        },
		        {text: "業務上", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone", 
		        	}
		        },
		        {text: "振替", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone", 
		        	}
		        },
		        {text: "有給休暇", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone,tablet", 
		        	}
		        },
		        {text: "Working Siteでの実働", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "all", 
		        	}
		        },
		        {text: "実働", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone", 
		        	}
		        },
		        {text: "平日無給", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone,tablet", 
		        	}
		        },
		        {text: "平日通常残業", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "", 
		        	}
		        },
		        {text: "平日深夜残業", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone,tablet", 
		        	}
		        },
		        {text: "土・祝実働", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "phone,tablet", 
		        	}
		        },
		        {text: "日曜実働", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "all", 
		        	}
		        },
		        {text: "振替休日対象の休日出勤", defaultText: "",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "all", 
		        	}
		        },
		        {text: "備考/Note (休みの種別など記入）", defaultText: "abcd",
		        	attrs: {
		        		"class": "",
		        		"data-class": "",
		        		"data-hide": "all", 
		        	}
		        }
		    ],
		    
			"weekday": ["日", "月", "火","水","木","金","土"],
			"holiday": [21, 28, 29, 30, 31]
		};
 
    $.fn.timesheetTable = function( options ) {
    	
    	var settings = $.extend({
            // These are the defaults.
            month: $.getCurmonth(),
            data: [],
        }, options );
    	
        this.attr("class", "footable timesheet");
        
        // timesheet headers
        this.append("<thead><tr></tr></thead>");
        var headrow = this.find("thead tr");
        for (var i in defaultData.headers){
      	  var header = defaultData.headers[i];
      	  var th = $("<th></th>").text( header.text ).appendTo( headrow );
      	  
      	  for (var key in header.attrs){
      		  th.attr(key, header.attrs[key]);
      	  }
        }
        
        
        //function
        
        this.getMonth = function(){
        	return settings.month;
        };
        
        // get month data
        this.getData = function(){
        	var data = [];
        	
        	this.find("tbody tr").each(function(){
        		var row = {};
        		
        		$(this).find("td").each(function(i){
        			if ( $(this).text() != "" )
        				row[ defaultData.headers[i].text ] = $(this).text();
        		});
        		
        		data.push(row);
        	});
        	
        	return data;
        };
        
        // 
        this.applyMonth = function(monthStr, data){
        	settings.month = monthStr;
        	settings.data = data;
        	
        	this.attr("class", "");
        	this.find("tbody").remove();
        	this.append("<tbody></tbody>");
        	
        	// timesheet contents
            if ( !data || data.length == 0){
            	// use dafault
    	        var year = monthStr.split("-")[0];
    	        var month = parseInt(monthStr.split("-")[1]) - 1;
    	        
    	        var monthStart = new Date(year, month, 1);
    	        var monthEnd = new Date(year, month + 1, 1);
    	        var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    	        
    	        month += 1;
    	        var wday = monthStart.getDay();
    	        for (var day = 1; day <= monthLength; day++){
    	      	  var tr = $("<tr></tr>").appendTo(this);
    	      	  var td = [];
    	      	  td[0] = $("<td></td>").text( month + "月/" + day + "日" ).appendTo(tr);
    	      	  td[1] = $("<td></td>").text( defaultData.weekday[wday] ).appendTo(tr);
    	      	  
    	      	  for (var i = 2; i < defaultData.headers.length; i ++){
    	      		  td[i] = $("<td></td>").text( defaultData.headers[i].defaultText ).appendTo(tr).addClass(defaultData.headers[i].defaultClass);
    	      		  // add attribute for each column
    	      		  for (var key in defaultData.headers[i].cellAttrs){
    	      			  td[i].attr(key, defaultData.headers[i].cellAttrs[key]);
    	      		  }
    	      		  
    	      		  if (td[i].hasClass("time-input")){
    	      			  //time spinner
    	      		  }
    	      	  }
    	      	  
    	      	  if (wday == 0){
    	      		  td[0].addClass("alert-danger");
    	      		  td[1].addClass("sunday");
    	      		  td[3].text("");
    	      		  td[4].text("");
    	      		  td[5].text("");
    	      	  }
    	      	  if (wday == 6){
    	      		  td[0].addClass("alert-info");
    	      		  td[1].addClass("saturday");
    	      		  td[3].text("");
    	      		  td[4].text("");
    	      		  td[5].text("");
    	      	  }
    	      	  if ( defaultData.holiday.indexOf(day) >= 0 ){ 
    	      		  td[0].addClass("alert-success");
    	      		  td[1].addClass("holiday");
    	      		  td[2].text("*");
    	      		  td[3].text("");
    	      		  td[4].text("");
    	      		  td[5].text("");
    	      	  }
    	      	  
    	      	  wday = (wday == 6) ? 0 : wday += 1;
    	        }
            }
            else {
            	for (var i in data){
            		var tr = $("<tr></tr>").appendTo(this);
            		for (var j in defaultData.headers){
            			$("<td></td>").text( data[i][ defaultData.headers[j] ] ).appendTo(tr);
            		}
            	}
            }
            
            /*
             * fooTable
             */
            this.footable({
          	  toggleSelector: ' > tbody > tr:not(.footable-row-detail) > td:first-child'
            });
            //end footable
            
        };
        
        this.applyMonth(settings.month, settings.data);
        
        return this;
    };
    
    $.getCurmonth = function(){
    	var date = new Date();
    	var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        
        return year + "-" + month;
    };
 
    $.ltrim = function( str ) {
        return str.replace( /^\s+/, "" );
    };
 
    $.rtrim = function( str ) {
        return str.replace( /\s+$/, "" );
    };
 
}( jQuery ));