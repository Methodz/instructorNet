
//=================== GLOBAL VARIABLES ==========================
//HREF's

var studentList = [];
var student = {
	name:"Dillon Hudson",
	id:"1617234",
	url:"https://atpintra.net/whiteboard/training-record.lasso?customerProgramID="
};

//STYLE
var css;
var elements_Class;
var closeBtn;

//UI
var ui_container;
var ui_set_id = "ui_container";
var ui_class_default = "ui-default";
var ui_elements;
var htmlElement;

var ui_container_pageDetails;
var ui_container_interface;
var ui_container_reports;

// TIMELINE ELEMENTS
var timeline_container = document.getElementById("timeline_container");
var timeline_header = timeline_container.children[0];

var dateToday;
var timeNow;
var timeNowHours;
var timeNowMinutes;
var timeNowSeconds;

var timeline_selectedDate;
var timeline_sun;
var timeline_sunrise;
var timeline_sunset;
var timeline_blockStartTimes = [];
var timelineRows;

var timelineAircraft;
var aircraftKCRG;
var tail;
var thisTail = "";
var tailResult;
var tailNums = [];
var archers = [];
var cessnas = [];
var seminols = [];

// AIRCRAFT TAILS @ KCRG
archers = [
'487A',
'792A',
'603A',
'908A',
'395D'
];
cessnas = [
'80755',
'5288R',
'2859E',
'9387H',
'23673',
'13293',
'8986V',
'9250V',
'2459M'
];
seminols = [ 
'2111F',
'2931T',
'215FW',
'239AT',
'265AT',
'345FA'
];

//REPORT
var reportData = "";
var alertReport;


//=================== SET STYLES==========================
function setStyles(){
	
	
	// SET STYLE: ui-container (primary container)
	ui_container.style.borderStyle = "solid";
	ui_container.style.borderWidth = "2px";
	ui_container.style.borderColor = "black";
	ui_container.style.backgroundColor = "white";
	ui_container.style.overflow = "hidden";

	ui_container.style.width = "200px";
	ui_container.style.height = "100%";
	ui_container.style.position = "absolute";
	ui_container.style.right = "0px";
	ui_container.style.top = "0px";
	ui_container.style.textAlign = "center";
	ui_container.style.opacity = 0.8;
	
	
	// SET STYLE: ui_container_close button
	closeBtn = document.getElementById('ui_container_close');
	closeBtn.style.width = "95%";
	closeBtn.style.textAlign = "right";

	
	// SET STYLE BY CLASS: ui-default
	elements_Class = document.getElementsByClassName('ui-default');
	for(i=1; i <= elements_Class.length; i++){

        elements_Class[i-1].style.borderStyle = "solid";
        elements_Class[i-1].borderWidth = "2px";
        elements_Class[i-1].style.borderColor = "black";
        elements_Class[i-1].style.backgroundColor = "white";

        elements_Class[i-1].style.width = "100%";
        elements_Class[i-1].style.height = "auto";
		elements_Class[i-1].style.marginBottom = "10px";
		
	};
	
	
	
};// END setStyles()


//=================== INJECT UI ==========================
function build_ui(){

	ui_container = document.createElement("div"); // create div element to hold ui 
	document.body.appendChild(ui_container);// inject ui container into the dom
	ui_container.id = ui_set_id; // set id for future reference
	
	//SET INNER HTML FOR UI
	ui_elements = (
		'<div id="ui_container_header" onClick="" >' +
			'<div id="ui_container_close" onClick="hideUI()"><b> Close </b></div><br>' + 
			'<h3 id="ui_container_title"><b> Scheduler Pro <h3><br>' + 
		'</div>' +
		
		
		
		'<div id="ui_container_pageDetails" class="ui-default" onClick="" >' +
			'<h3 id="ui_container_pageDetails_title"> Page Details</h3>' +
		
		'</div>' + 
		
		

		'<div id="ui_container_interface" class="ui-default" onClick="" >' +
			'<h3 id="ui_container_Interface_title"> Interface </h3>' +

		'</div>' + 
		

		
		'<div id="ui_container_reports" class="ui-default" onClick="" >'+
			'<h3 id="ui_container_reports_title"> Reports </h3>' +

		'</div>' 

	); // content to insert

	ui_container.innerHTML = ui_elements; // add all ui elements to ui container
	
	// RUN INITIAL FUNCTIONS
	setStyles(); // set UI styles
	
	getTimelineDate(); // get date of timeline in page
	getDateTimeNow(); // get current date/time of user machine
	getSunriseSunset(); // get timeline sunrise and sunset time
	findAircraft("2459M"); // search for this aircraft and return timeline row found.
	
	displayReport();

	return "UI Injection Complete";
	
};// END BUILD_UI()




function add_div(cnt){ // UNUSED
	
	var numDivs = cnt; // number of divs to be created/added to dom.
	
	var newdiv = document.createElement('div');
	//newdiv.id = ""; // this is the loop count, only needed if addressing absolutely

};

function append_content(str){ // UNUSED
};

function getTimelineDate(){
	
// get timeline selected date 
	timeline_selectedDate = document.getElementById("refdate_repeater").innerHTML;
	return timeline_selectedDate;
};//END getTimelineDate()

function getDateTimeNow(){
	
	dateToday = new Date();
	timeNow = dateToday.getHours() + ":" + dateToday.getMinutes() + ":" + dateToday.getSeconds();
	timeNowHours = dateToday.getHours();
	timeNowMinutes = dateToday.getMinutes();
	timeNowSeconds = dateToday.getSeconds();
	
	return timeNow;
};

function getSunriseSunset(){ // get sunrise and sunset times
	
	timeline_sunSpan = document.getElementById('timeline_daylight') // daylight span container
	timeline_sun = document.getElementById('timeline_daylight').children;// sunrise and set values
	
	// this combined with date collected we can get convert to date object
		// this container.style.width value gives us time between sunrise and sunset
		// container.style.left gives offset from timeline start
		
	timeline_sunrise = timeline_sun[0].innerText; //i.e  "Sunrise 7:22 AM"
	timeline_sunset = timeline_sun[1].innerText;// i.e "Sunset 7:04 PM"
	
	// for parsing text length is 15 <br> is same as a space get start time by taking length minus numchars for "sunrise"


};

function createNewTimelineBlock(){ // W.I.P.
  
		//div class elements required
		divClassBlocktype = '<div class="timeline_block aircraft_block ';//constant
		divPersonelId = 'personnelid5137 '; // *changes with each user
		divEventType = 'event-flight event-moduleID-0" '; // constant
		divTag_end = '</div>';
		//div style elements required
		
		styleTag_start = 'style="'
		styleLeft = 'left: 304px; '; // this is the offset from begining of timeline (time of day flight starts)
		styleWidth = 'width: 81px; '; // this is length of flight in px
		styleTop = 'top: 0px; '; // this is placement within the row vertically (always unchanged)
		styleHeight = 'height: 20px; ';// height of block in row (always unchanged)
		styleTag_end = '" data-original-title="" title="">';
    
		innerHTML = 'TDM / Jeffers';
		
		// CREATE NEW FLIGHT BLOCK
		newTimelineBlock = (divClassBlocktype + divPersonelId + divEventType + styleTag_start + styleLeft + styleWidth + styleTop + styleHeight + styleTag_end + innerHTML + divTag_end)
   
		// INSERT DIV INLINE
		newDiv = document.createElement("div");
		//newDiv = '<div class="" style="" data-original-title="" title=""></div>'
		newDiv.class = classString; // set div class
		newDiv.style = styleString; // set div style
		newDiv.innerHTML = innerHTML; // set div inner html

};// END createNewTimelineBlock()

function getTimelineBlocks(){ // W.I.P.

	timelineAircraft = document.getElementById("timeline_container_aircraft");
	timelineRows = timelineAircraft.children; // all rows as array (nested divs galore..)
	timelineRows.length; // number of aircraft schedule rows
	
	// loop through each row and get info
	
	for(i=1;i<=timelineRows.length;i++){
		
		
	};
	
	var a = timelineRows[0]; // aircraftScheduleRow - get all timeline rows for parsing
	var b = a.children // elements in this row
	var c = b[0].children // aircraftDetails -  get row aircraft information (mx report, plane type, avionics, afttr, tail)
		//c[0].innerText - MX report text
		//c[1].innerText - Aircraft type
		//c[2].innerText - Avionics (if available)
		//c[3].innerText - hrs to ATTIS (aircraft total time in service) 
		//c[4].innerText - tail numbers
		
		//** NOTE the absolute address i.e. "c[0]" CHANGES based on mx and other items. may be best to get all children and look for patterns
		
	var d = b[1].children; // Scheduled Flight Blocks in this row
		d.length // number of aircraft in this row (first element is "timeline_label_container" unused)
		//d[0]
		//d[1].left && d[1].width 
		//d[2]
	
		// aircraft blocks are  1 through d.length values needed are below.
		d[1].left 
		d[1].width //d get offset and width of scheduled element
			//b[0] is timeline-label-container (empty not usable - just skip)
			//c[0] is unusable line


// get timeline container and then collect timeline time/date hour block start in px

//timeline_container = document.getElementById("timeline_container");//timeline_container
//timeline_header = timeline_container.children[0];// header div


/*	var a = document.getElementById("timeline_container");
	var b = a.children;
	var c = b[0].children;
	var d = c[1].children;// timeline hour blocks as array

	var time_hour_text = d[0].innerText; // value of the hour i.e. this block is the first hour in the timeline (starting hour)

	var time_hour_offsetInPx = d[0].left; // width in pixels this time block starts relative to the timeline 
*/
		   // i.e this block is "0" where as second hour 0800 starts at "35" or 35px from left. 
		   // this is how we can tell when the hour starts.
	
};

function findAircraft(str){ // find aircraft by tail number in list of all aircraft

	thisTail = 	str;
	timelineAircraft = document.getElementById("timeline_container_aircraft");//get aircraft container
	aircraftKCRG = timelineAircraft.children;// get aircraft from this location
	
	if(thisTail != undefined ){
		
		for(i=1; i<= aircraftKCRG.length ; i++){
			
			tail = aircraftKCRG[i-1].dataset.nnumber; // get tail number
			if(tail == thisTail){ // if tailnumber is same log it.
				tailResult = (thisTail + " found in line: " + (i-1));
			};//end if/then loop
			
		};// end for/i loop
	}else{ // find and collect all aircraft listed in this timeline.
		
		tailResult = "No Tail Found.";
		// [] loop through all tails and collect to tails array. then push tails array to data array for reporting
		
	};// end if/then/else

};// END findAircraft()

function updateUI(){ // UNUSED
	
	//var div = document.getElementById('divID');
	//div.innerHTML += 'Extra stuff';
	
};

function rollupUI(){ // UNUSED
	
	//document.getElementById('ui_container').style.display = "none";


	if(ui_open == true){
	    ui_open = false
        document.getElementById('ui_container').style.height = "70px";
        document.getElementById('ui_container_close').innerHTML = "+";
	    
	}else{
        ui_open = true
	    ui_open = false
        document.getElementById('ui_container').style.height = "100%";
        document.getElementById('ui_container_close').innerHTML = "X";
	};


	
	
};

function hideUI(){
	
	document.getElementById('ui_container').style.display = "none";

};

/*=================== REPORTS =======================*/
function displayReport(){// UNUSED
	
	ui_container_reports = document.getElementById('ui_container_reports');
	var data=[];
	
	// COLLECT REPORT DATA
	data.push(timeline_selectedDate);
	data.push("Current Time: " + timeNow);
	data.push(timeline_sunrise);
	data.push(timeline_sunset);
	data.push(tailResult); // test
	
	// BUILD REPORT
	for(i=1; i<= data.length; i++){
		
		reportData = (reportData + data[i-1] + "<br>" );
	};

	// WRITE REPORT
	ui_container_reports.innerHTML += reportData;

};// END displayReport()


/*=================== ATP FUNC FOR REF =======================*/
function drawNowLine() {

	var now		= moment().subtract(timeline_clientoffsetmsec, "millisecond");
	var height	= $("#timeline_container").height();

	if($("#timeline_now_line").length === 0) {
		$(".timeline_header_main").first().append("<div id=\"timeline_now_line\" />");
	}
	
	$("#timeline_now_line")
		.css("height", height + "px")
		.css("width", getTimelinePercentX(now) + "%");
	
	setTimeout(function(){drawNowLine();}, 1000*60);

}


build_ui();// BUILD & INJECT UI

/*
//====================================================================================================================================
//========================== TO DO's =================================================================================================
//====================================================================================================================================

[] get open gaps on schedule for easy identification of blocking
[] save block details in local.storage(json.stringify / json.parse)
	- switch pages and schedule students
	- may need to be on student page, if so will need to collect student id's to append url

[] function convert pixels to time and time to pixels
[] get width of timeline container this represents 100% of time slots from begining of timeline to end
	- get width of timeline container
	- get total time of timeline
	- get width of each timeline_block 
	- devide timeline_time / number of pixels = pixels per hour
	- can get start/end times of each block now
	
	
javascript get time

	var minutes = 1000 * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var years = days * 365;
	var d = new Date();
	var t = d.getTime();

var y = Math.round(t / years);



================================   NOTES  ==========================
javascript style snippets > https://www.w3schools.com/jsref/dom_obj_style.asp


time blocks are relative to the left side of the timeline container
	0px is beginign of timeline 0600 
	45px 0700 starts
	122px = 3hr block
	3px padding on every flight container
	
	0.67px  each min ( but this doesnt work every time)


180minutes = 3hrs
180min/120px == 0.67px / minute of flight time this is rounded math.floor() as per atp website;


A Block 44pxc + 122 = B
B Block 166pxc + 121 = C
C Block 287pxc + 120 = D
D Block 407pxc + 119 = E



get date from top

loop through all aircraft blocks // divs have no ID must search using div class if class 

	document.getElementByID("timeline_container_aircraft");

	then get div data0nnumber(tail number)

	if tail number is in list of flyable aircraft
		collect all div entries offset from left
	
	


parameters
get width of div (this is flight time)
get offset from left (this is start time)
get end time (offset from left + width of div)

get open gaps (time between end of start of each aircraft div
"row aircraft_row

div.data_nnumber
*/