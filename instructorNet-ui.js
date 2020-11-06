//=================== INJECT UI ==========================
//var thispage = document.location.href;
//alert(thispage);
function init_insructorNet_ui(){ // NOT FINISHED

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
		ui_container.style.opacity = "0.5";

		// set container position
		ui_container.style.width = "300px";
		ui_container.style.height = "400px";
		ui_container.style.position = "absolute";
		ui_container.style.right = "0px";
		ui_container.style.top = "70px";
	
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
//init_insructorNet_ui();

