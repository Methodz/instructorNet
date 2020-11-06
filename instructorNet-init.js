/*============================= ATP Intranet PRO =============================*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// VARIABLES /////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SCRIPTI DETAILS
var scriptDetails;
var ver = 0.1; // incriment manually or via cookie
var lastRev = "2020-11-6"; // set manually or get via cookie
var info = // short description of the functionality
	"ATPIntranet Pro is meant to be a seemless layer run over-top of " +
	"the ATP intranet interface to provide new tools and functionality " + 
	"which is not available in the currrent product. These tools enhance " + 
	"transparency of student scheduling, available aircraft, instructor fees " + 
	"and many other aspects of the website.";
var help = // more info to help users navigate script usage. This can be accessed fromt he embeded ui menus
	" " +
	" " +
	" " +
	" " 
	;
var scriptDetails ={
		"version" : ver,
		"rev" : lastRev,
		"info" : info,
		"help" : help
	};
	

// STORAGE
var inst_loginTime; //unused - time logged in in milliseconds for autologout feature
var inst_name;//unused
var inst_id;//unused
var inst_studentList = [];
var inst_studentID = [];

var stu_name;//unused
var stu_id;//unused
var stu_misc1;//unused
var stu_misc2;//unused
var stu_misc3;//unused


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// inject content and aggrigate changes
function init_instructorNet(){
	
	
	// append <body onload="myFunction()"> once complete init scripts.
	// set localStorage Variables - standardized localStorage parsing for every page.
	// get cookie information
	// check/set login time and start timer for autologout
	// start event handlers (mouse movement / keyboard input)
	// load user info based on name/id i.e. 'user' : 'Christopher Campbell (5454)' - found in view source


	// start UI and load init script. this should be used to.
	alert("Init Complete");

};
//init_instructorNet();

function updateLS(add,update,remove,clear){// make changes to local storage.
	var addItem = add;//add item to local storage
	var updateItem = update;// update an item already in local storage
	var removeItem = remove;//remove item from local storage
	var clearItem = clear;//clear local storage if (0,1)
	};





//NOTES & REMAKRS
/*

	*** cjs extension should be used to call the init_instructorNet() function which calls and loads all other scripts as needed. ***

	This script is what should be launched using CJS
	- hold unchanging global variables in this. Anything
	- launch UI upon login and this is used to navigate.
	
	cjs holds as little information as possible
	hold page specific variables in each pages called script file.



*/
// SNIPPETS
/*
GOOGLE DRIVE RESOURCES
https://docs.google.com/spreadsheets/d/1dTNANVw4NlvNf5uxr_zssnVaFQDQFjo2ba0ejhkDOM8/edit#gid=623447720



	LOCAL STORAGE / SESSION STORAGE / COOKIES
	https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
		"can be used to store information accross pages and has a maximum of about 5mb and is limited to strings only.
		can not use 'myStorage' variable accross pages. just use the explicit address 'localStorage.xx'

		myStorage = window.localStorage
		localStorage.setItem('myCat', 'Tom');
		const cat = localStorage.getItem('myCat');
		localStorage.removeItem('myCat');
		localStorage.clear();"
		
		
		
		
		
		
		
*/