/*
================================================================
ATP REPORT GENERATOR
ver: 0.2

DESCRIPTION: Report Generator
- uses Schedule page to quick gather and generate monday and thursday report items to be written down.
- Alternative to the Google Docs Script which produces a nicer more parsable dataset.
- this only provides  an organized list of event type, event date, aircraft, student name, instructor name (maybe)

[x] get table into variable
[x] identify pattern for for key data to capture
	[]set date range
		
	[x]get event type
	[x]get event date
	[]get aircraft
	[x]get student name
	
[x] capture data and store for report
[x] generate report
[] identity thursday items and monday items for easy translation
[] show cancelled items separately ( counting this number could prove usefull later
[] show report and provide options for export (copy/paste, print etc..)
================================================================

*/


//================================================================
//			GLOBAL VARIABLES
//================================================================

thisScript = {
	name: 'ATP Scheduler Pro - Report Generator',
	ver: '0.2 Updated: 10/26/2020',
	pgURL: 'https://atpintra.net/whiteboard/schedule.lasso'
};
//location.href = thisScript.pgURL; // navigate to this page url

var table;
var trows;
var tcols;
var eventDate;
var eventUser;
var errors = [];

var flag_trows = 0;

var	numGreenEvents = 0;//stat
var	numYellowEvents = 0;//stat
var numCancelledEvents = 0;//stat
var ratioFltGnd;//stat


// PRINT REPORT Generator
var printWindow;
var ui_content;
var ui_reportType = ["https://i.postimg.cc/s2cYgsy3/Report-Monday.jpg","https://i.postimg.cc/9Qz072GW/Report-Thursday.jpg"];
var divs;
var InstructorName = 'Chris Campbell';
var reportDate = '2020-10-24';

var studentName1 = 'Student 1';
var student1_flights = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24'];
var student1_reason = 'Student 1 flew all necessary flights.';

var studentName2 = 'Student 2';
var student2_flights = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24'];
var student2_reason = 'Student 2 flew all necessary flights.';;

var studentName3 = 'Student 3';
var student3_flights = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24'];
var student3_reason = 'Student 3 flew all necessary flights.';;


//================================================================
//			FUNCTIONS
//================================================================

	
//=================== INJECT UI ==========================
function build_ui(){ // NOT FINISHED

//UI
var ui_container;
var ui_set_id = "ui_container";
var ui_class_default = "ui-default";
var ui_elements;
var htmlElement;

var ui_container_pageDetails;
var ui_container_interface;
var ui_container_reports;


	// BUILD UI ELEMENTS
	ui_container = document.createElement("div"); // create div element to hold ui 
	document.body.appendChild(ui_container);// inject ui container into the dom
	ui_container.id = ui_set_id; // set id for future reference

	ui_elements = (
		'<div id="data-container"> </div>' + // hold generated info for quick viewing
		'<div id="btn-print" onclick="createMondayReport()"> Print Monday Report </div>'  // button to generate printable form
		//'<div id=""> </div>' + // 
	);
	
	ui_container.innerHTML = ui_elements; // add all ui elements to ui container
		// SET STYLE: ui-container (primary container)
		ui_container.style.borderStyle = "solid";
		ui_container.style.borderWidth = "2px";
		ui_container.style.borderColor = "black";
		ui_container.style.backgroundColor = "white";
		ui_container.style.overflow = "hidden";

		ui_container.style.width = "300px";
		ui_container.style.height = "400px";
		ui_container.style.position = "absolute";
		ui_container.style.right = "0px";
		ui_container.style.top = "0px";
	
	ui_btnPrint = document.getElementById('btn-print');
		ui_btnPrint.style.textAlign = "center";
		ui_btnPrint.style.marginLeft = "50px";
		ui_btnPrint.style.backgroundColor = "#d1d1d1";
		ui_btnPrint.style.fontColor = "#ffffff";
		ui_btnPrint.style.borderStyle = "solid";
		ui_btnPrint.style.borderColor = "black";
		ui_btnPrint.style.borderWidth = "1px";
		ui_btnPrint.style.width = "200px";
		ui_btnPrint.style.height = "30px";
/*	
	ui_dataContainer = document.getElementById('data-container');
		ui_dataContainer.style.borderStyle = "solid";
		ui_dataContainer.style.borderWidth = "2px";
		ui_dataContainer.style.borderColor = "black";
		ui_btnPrint.style.width = "100%";
		ui_btnPrint.style.height = "auto";
*/		

	
	//SET REPORT BACKGROUND IMAGE
	//document.getElementById('ui_container').style.backgroundImage = ui_container_bg_monday;
	//ui_container.style.backgroundRepeat = "no-repeat"
	//ui_container.style.backgroundSize = "100% 100%";


	return "UI Injection Complete";
	
};// END BUILD_UI()
build_ui();


function createMondayReport(){
	
	var printWindow;
	var ui_content;
	var ui_reportType = ["https://i.postimg.cc/s2cYgsy3/Report-Monday.jpg","https://i.postimg.cc/9Qz072GW/Report-Thursday.jpg"];
	//var ui_container_bg_monday = "URL('https://i.postimg.cc/s2cYgsy3/Report-Monday.jpg')";
	//var ui_container_bg_thursday = "URL('https://i.postimg.cc/9Qz072GW/Report-Thursday.jpg')";
	var divs;
	var InstructorName = 'Chris Campbell';
	var reportDate = '2020-10-24';
	
	var studentName1 = 'Student 1';
	var student1_flights = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24'];
	var student1_reason = 'Student 1 flew all necessary flights.';
	
	var studentName2 = 'Student 2';
	var student2_flights = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24'];
	var student2_reason = 'Student 2 flew all necessary flights.';;
	
	var studentName3 = 'Student 3';
	var student3_flights = ['2020-10-20','2020-10-21','2020-10-22','2020-10-23','2020-10-24'];
	var student3_reason = 'Student 3 flew all necessary flights.';;
	
	
	printWindow = window.open('', '', 'width=612px, height=792px');//open window for printing.
	//printWindow.document.write();
	
	htmlContent = (
				'<html>' +
				'<head>' + 
				//'<style type="text/css">' +
				//'reportText{' + 
					//'font-size:12px;' +
					//'font-family:arial;' +
					//'font-weight:bold;'+
				//'}'+
				//'</style>' +
				'</head>' +
				'<body>' +
					'<div id="reportData">' +
						'<div id="report_instructor">' + InstructorName + '</div>' +
						'<div id="report_date">' + reportDate +'</div>' +
					
						'<div id="studentName1" >'+ studentName1 +'</div>' +
						'<div id="student1_flt1" >'+ student1_flights[0] +'</div>' +
						'<div id="student1_flt2" >'+ student1_flights[1] +'</div>' +
						'<div id="student1_flt3" >'+ student1_flights[2] +'</div>' +
						'<div id="student1_flt4" >'+ student1_flights[3] +'</div>' +
						'<div id="student1_flt5" >'+ student1_flights[4] +'</div>' +
						'<div id="student1_reason" >'+ student1_reason +'</div>' +
				
						'<div id="studentName2" >'+ studentName2 +'</div>' +
						'<div id="student2_flt1" >'+ student2_flights[0] +'</div>' +
						'<div id="student2_flt2" >'+ student2_flights[1] +'</div>' +
						'<div id="student2_flt3" >'+ student2_flights[2] +'</div>' +
						'<div id="student2_flt4" >'+ student2_flights[3] +'</div>' +
						'<div id="student2_flt5" >'+ student2_flights[4] +'</div>' +
						'<div id="student2_reason" >'+ student2_reason +'</div>' +
		
						'<div id="studentName3" >'+ studentName3 +'</div>' +
						'<div id="student3_flt1" >'+ student3_flights[0] +'</div>' +
						'<div id="student3_flt2" >'+ student3_flights[1] +'</div>' +
						'<div id="student3_flt3" >'+ student3_flights[2] +'</div>' +
						'<div id="student3_flt4" >'+ student3_flights[3] +'</div>' +
						'<div id="student3_flt5" >'+ student3_flights[4] +'</div>' +
						'<div id="student3_reason" >'+ student3_reason +'</div>' +

					'</div>' + 
					'<div id="ui_content">' +
						'<img id="report-bg" src=' + ui_reportType[0] + '></img>' +
						
					'</div>' +
				'</body>' + 
				'</html>'
				);
				
	printWindow.document.write(htmlContent);
	
	ui_content = printWindow.document.getElementById('ui_content');
		ui_content.style.position = "absolute";
		ui_content.style.left = "0px";
		ui_content.style.top = "0px";
		ui_content.style.height = "1000px";
		ui_content.style.width = "800px";
		ui_content.style.zIndex = "-1";
		
	img_content = printWindow.document.getElementById('report-bg'); // container to hold bg image of report
		img_content.style.position = "absolute"
		img_content.style.objectFit = "cover";
		img_content.style.minHeight = "100%";
		img_content.style.minWidth = "100%";
		//img_content.style.zIndex = "-1";
		//style="width:1280px; height:1920px;"
	
	reportData = printWindow.document.getElementById('reportData'); // container to hold all generated report data
		reportData.style.borderColor = "black";
		reportData.style.border = "1px";
		reportData.style.position = "absolute";
		reportData.style.top = "0px";
		reportData.style.left = "0px";
		reportData.style.width = "100%";
	
	// REPORT DETAILS
	report_instructor = printWindow.document.getElementById('report_instructor'); // name of instructor on form	
		report_instructor.style.position = "absolute";
		report_instructor.style.top = "258px";
		report_instructor.style.left = "200px";
	/*
		//report_instructor.style.margins = "0px";
		//report_instructor.style.height = "100%";
		//report_instructor.style.width = "100%";
		//report_instructor.style.fontSize = "12px";
		//report_instructor.style.fontFamily = "arial";
		//report_instructor.style.fontWeight = "bold";
		//report_instructor.style.zIndex = "1";
	*/

	report_date = printWindow.document.getElementById('report_date'); // date report generated displayed on form
		report_date.style.position = "absolute";
		report_date.style.top = "260px";
		report_date.style.left = "375px";	
		//report_date.style.width = "50px";


	//STUDENT 1	
	student_name1 = printWindow.document.getElementById('studentName1');
		student_name1.style.position = "absolute";
		student_name1.style.top = "295px";
		student_name1.style.left = "160px";
		
	student1_flt1 = printWindow.document.getElementById('student1_flt1');
		student1_flt1.style.position = "absolute";
		student1_flt1.style.top = "332px";
		student1_flt1.style.left = "160px";
		
	student1_flt2 = printWindow.document.getElementById('student1_flt2');
		student1_flt2.style.position = "absolute";
		student1_flt2.style.top = "350px";
		student1_flt2.style.left = "160px";
	student1_flt3 = printWindow.document.getElementById('student1_flt3');
		student1_flt3.style.position = "absolute";
		student1_flt3.style.top = "370px";
		student1_flt3.style.left = "160px";
	student1_flt4 = printWindow.document.getElementById('student1_flt4');
		student1_flt4.style.position = "absolute";
		student1_flt4.style.top = "388px";
		student1_flt4.style.left = "160px";
	student1_flt5 = printWindow.document.getElementById('student1_flt5');
		student1_flt5.style.position = "absolute";
		student1_flt5.style.top = "405px";
		student1_flt5.style.left = "160px";
	student1_reason = printWindow.document.getElementById('student1_reason');
		student1_reason.style.position = "absolute";
		student1_reason.style.top = "440px";
		student1_reason.style.left = "100px";
	

	//STUDENT 2 
	student_name2 = printWindow.document.getElementById('studentName2');
		student_name2.style.position = "absolute";
		student_name2.style.top = "530px";
		student_name2.style.left = "160px";
	student2_flt1 = printWindow.document.getElementById('student2_flt1');
		student2_flt1.style.position = "absolute";
		student2_flt1.style.top = "567px";
		student2_flt1.style.left = "160px";
	student2_flt2 = printWindow.document.getElementById('student2_flt2');
		student2_flt2.style.position = "absolute";
		student2_flt2.style.top = "583px";
		student2_flt2.style.left = "160px";
	student2_flt3 = printWindow.document.getElementById('student2_flt3');
		student2_flt3.style.position = "absolute";
		student2_flt3.style.top = "603px";
		student2_flt3.style.left = "160px";
	student2_flt4 = printWindow.document.getElementById('student2_flt4');
		student2_flt4.style.position = "absolute";
		student2_flt4.style.top = "620px";
		student2_flt4.style.left = "160px";
	student2_flt5 = printWindow.document.getElementById('student2_flt5');
		student2_flt5.style.position = "absolute";
		student2_flt5.style.top = "639px";
		student2_flt5.style.left = "160px";
	student2_reason = printWindow.document.getElementById('student2_reason');
		student2_reason.style.position = "absolute";
		student2_reason.style.top = "673px";
		student2_reason.style.left = "100px";
	
	//STUDENT 3 
	student_name3 = printWindow.document.getElementById('studentName3');
		student_name3.style.position = "absolute";
		student_name3.style.top = "745px";
		student_name3.style.left = "160px";
	student3_flt1 = printWindow.document.getElementById('student3_flt1');
		student3_flt1.style.position = "absolute";
		student3_flt1.style.top = "785px";
		student3_flt1.style.left = "160px";
	student3_flt2 = printWindow.document.getElementById('student3_flt2');
		student3_flt2.style.position = "absolute";
		student3_flt2.style.top = "802px";
		student3_flt2.style.left = "160px";
	student3_flt3 = printWindow.document.getElementById('student3_flt3');
		student3_flt3.style.position = "absolute";
		student3_flt3.style.top = "820px";
		student3_flt3.style.left = "160px";
	student3_flt4 = printWindow.document.getElementById('student3_flt4');
		student3_flt4.style.position = "absolute";
		student3_flt4.style.top = "839px";
		student3_flt4.style.left = "160px";
	student3_flt5 = printWindow.document.getElementById('student3_flt5');
		student3_flt5.style.position = "absolute";
		student3_flt5.style.top = "858px";
		student3_flt5.style.left = "160px";
	student3_reason = printWindow.document.getElementById('student3_reason');
		student3_reason.style.position = "absolute";
		student3_reason.style.top = "890px";
		student3_reason.style.left = "100px";


/*
	//SET TEXT STYLES
	divs = printWindow.document.getElementsByTagName('div');// get all divs in array and loop through..
	for(i=1; i<= divs.length; i++){
		divs[i-1].style.fontSize = "12px"; // set font size to 12px
		divs[i-1].style.fontFamily = "arial";// set font family to arial
		divs[i-1].style.fontWeight = "bold";// set font weight to bold
	};
*/
	
	setTimeout(function(){printWindow.print()}, 3000); // short delay to allow background to be loaded fully. 
	//printWindow.print() // print document
	
/////////////// TO DO /////////////////
/*
	[] write loops to insture captured data from schedule table
	[] insert data captured from schedule table
	[] if student has no 3.0 popup to enter reason
	[] set text style to be more appealing
	[] design thursday slip that works with this generator (not the same form)


Print div snippets
https://www.c-sharpcorner.com/blogs/printing-html-div-tag-content-using-javascript1

*/
};

function setDateRange(d1,d2){ // this should be a full date with 2digit day values in the same format expected from function i.e.   setDateRange("2020-10-07","2020-10-19")

// SET DEFAULT DATES 
	//date's can be manually defined using the below format as well...	
	//2 digit day required always i.e. 2020-10-02  or 2020-10-31
	dateRange_year_start = "2020"; // set default to this year
	dateRange_month_start = "10"; // set default to this month
	dateRange_day_start = "06"; // set default to PAST monday as start date

	dateRange_year_end = "2020";// set default to this year
	dateRange_month_end = "10";// set default to this month
	dateRange_day_end = "20"; // set default to UPCOMING monday as end date - THIS REPRESENTS monday schedule period

	// create date range strings for input values
	dateRange_start = dateRange_year_start + "-" + dateRange_month_start + "-" + dateRange_day_start ;
	dateRange_end = dateRange_year_end + "-" + dateRange_month_end + "-" + dateRange_day_end ;

	//set date range string input values
	document.getElementById('startDate').value = DateRange_start;
	document.getElementById('endDate').value = DateRange_end;

	
	if(d1 != undefined && d2 != undefined){ // IF dates are provided to this function then...
		
		// set input date ranges provided
		dateRange_start = d1;
		dateRange_end = d2;
		
		//set date range string input values
		document.getElementById('startDate').value = dateRange_start;
		document.getElementById('endDate').value = dateRange_end;
	};

	// fire tabel update function.
	updateDisplayTable.call();
	

};// END setDateRange()
setDateRange('2020-10-02','2020-10-09');
function getEventData(){

var dateInput_start;
var dateInput_end;
	
var table;
var trows;
var tcols;
var eventDate;
var eventUser;
var errors = [];

var	numGreenEvents = 0;//stat
var	numYellowEvents = 0;//stat
var numCancelledEvents = 0;//stat
var ratioFltGnd;//stat
	
	//var container_eventData = document.getElementById('page-content');// container holding event data
	
	var table = document.getElementsByTagName("table"); // get table into variable
	var trows = table[0].rows; // get all rows in this table
	
	
	for(i=1; i<= trows.length; i++){
		
		if(trows[i-1].className == "greenflag"){
			try{
				
				rowcols = trows[i-1].getElementsByTagName("td");
				eventDate = rowcols[0].innerText; // event date
				eventType = rowcols[4].innerText; //  event type
				eventUser = rowcols[7].innerText; //  event user
				if(trows[i-1].children.length == 9){
					
					//flag_trows = 1
					eventUser = rowcols[6].innerText; //  event user - check if is special row with fewer cols. if so get user name one col sooner.
					
				};//END IF/then
				
				
				console.log("[" + eventUser + " | " + eventDate + " | " + eventType + "]");
				
				numGreenEvents += 1;
				
			}catch(err){
				errors.push(trows[i-1].id);
			};

		};//END if/then
		if(trows[i-1].className == "yellowflag"){
			
			numYellowEvents += 1;
			
		};// yellow flag
		
		if(trows[i-1].className == "cancelled"){
			
			numCancelledEvents += 1;
			
		};// cancelled
		
	};//END for/do loop
	
	
	numCancelledEvents = Math.ceil( numCancelledEvents/2);// devide canceled flights by 2 becuase 1 of every 2 is a comment. then round up to nearest number.
	PercentCanclled = Math.ceil( (100-((numYellowEvents + numGreenEvents)/numCancelledEvents*100)) );// get percentage of cancelled flights out of all scheduled and round up.
	
	// LOG DATA
		
		
		console.log("==================== ERRORS ==================");
		console.log(errors);
		console.log("==================== STATS ==================");
		console.log("Green Events: " + numGreenEvents);
		console.log("Yellow Events: " + numYellowEvents);
		console.log("Cancelled Events: " + numCancelledEvents);
		console.log("Cancelled Flights: " + PercentCanclled + "%");
		
		
};// END getEventData()
getEventData();


//================================================================
//			MISC
//================================================================
/*

POTENTIAL FEATURES
[WIP] Need ability to set date span on schedule page.
	[x] *this requires a click event to fire, simulate or fire on change should be 
	[x] DIV ID holding this is "date-options-range"
	[x] set value for input id "startDate"
	[x] set value for input id "endDate"
	[x] updateDisplayTable.call();
	[] date should default to range of current monday report (default start last monday, default end next monday)
	[] generate current report based on selection of report type.
	
[] UI popup for found events and the list
[] monday/thursday list can be auto populated using standard web dev populating background image of said report and populate events from this list
	- direct link to image for monday reports:  https://i.postimg.cc/s2cYgsy3/Report-Monday.jpg
	- direct link to image for thursday reports:  https://i.postimg.cc/9Qz072GW/Report-Thursday.jpg




*/
//================================================================
//			BUGS / FIXES
//================================================================
/*
[] error caught when there is a green flag item with a notes(briefing) column.
	-cancelled classes have 2 rows with corresponding IDS i.e.  row_ftd_440270_a   &   row_ftd_440270_b
	-for greenflag rows with a breifing comment
	- can be ignored or addressed at a later time. for now will leave as is.
	- EXAMPLE can be found friday 10/9/2020 searching for row_ftd_440270_a   &   row_ftd_440270_a



updateDisplayTable.call();

call(updateDipsplayTable())
updateDisplayTable();



*/
//================================================================
//			NOTES
//================================================================
/*
var table = document.getElementsByTagName("table");
var trows = table[0].rows;
var last = last.cells[0];
var cell = last.cells[0].innerHTMLl;

trows[5].className // get event type (green,yellow flag, cancelled etc)

var rowcols = trows[9].getElementsByTagName("td")

rowcols[0].innerText // date
rowcols[1].innerText // event time start
rowcols[2].innerText // event time end
rowcols[3].innerText // event time duration
rowcols[4].innerText // event type as innerText and link as <a href>
rowcols[5].innerText // event completion status
rowcols[6].innerText
*/	
	
	/*
	<tbody> // holds entire table including rows and columns
	<th> // holds head for each day in range. rows of content below.
	<tr class="greenflag" id="">// hold completed events and there data. id is unique for each entry.
		<td> // event date
		<td> // event time start
		<td> // event time end
		<td> // event time duration
		<td > // event type as innerText and link as <a href>
		<td> // event completion status - complete: has loc name as innerText and a link as <a href>, if cancelled text only
		<td ><span class="customer_popover" data-title="Contact Info" data-customerid=""> // holds customer information, special class and student name as innerText 
		<td> <span class="field_personnelName" data-title"Contact Info" data-instructorid="" data-original-title="" title=""> // holds instructor information and name via innerText  
		<td class="rightcolumn"> // this is an empty row column 
		<td> // 
	<tr class="yellowflag" id="">// hold events that have passed and are a) not completed or b) not logged 
	<tr class="cancelled" id="">// hold events that have been cancelled. id is unique for each entry. cancelled events have additional TD with it pattern _a and _b. this can be used to quickly grab reason for cancellation.
	<tr class="">// hold events in the future
	*/
	
		//[] get required directory's for parsing
		//[] grab single line data and evaluate patterns and uniquely identifiable rows/columns
		// runs cript capture all data for later use