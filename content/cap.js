var savefile = "";


// get the path to the user's home (profile) directory
const DIR_SERVICE = new Components.Constructor("@mozilla.org/file/directory_service;1","nsIProperties");
try { 
	path=(new DIR_SERVICE()).get("ProfD", Components.interfaces.nsIFile).path; 
} catch (e) {
	alert("error");
}
// determine the file-separator
if (path.search(/\\/) != -1) {
	path = path + "\\extensions\\googlegadgets@shree.kant\\content\\";
} else {
	path = path + "/extensions/googlegadgets@shree.kant/content/";
}
savefile = path+savefile;



//Determines the actual path for your gadget on your local System


function fileName() {
var obj = new Object ( );
obj.res = "";
window.openDialog("chrome://googlegadgets/content/fileDialog.xul", 'myDialog',"chrome,resizable,scrollbars,dialog=yes,close,modal=yes",obj);

savefile=obj.res+".html";


// get the path to the user's home (profile) directory
const DIR_SERVICE = new Components.Constructor("@mozilla.org/file/directory_service;1","nsIProperties");
try { 
	path=(new DIR_SERVICE()).get("ProfD", Components.interfaces.nsIFile).path; 
} catch (e) {
	alert("error");
}
// determine the file-separator
if (path.search(/\\/) != -1) {
	path = path + "\\extensions\\googlegadgets@shree.kant\\content\\";
} else {
	path = path + "/extensions/googlegadgets@shree.kant/content/";
}
savefile = path+savefile;
save();
//read();
}


//Function saves the gadgets in your Local System 
function save() {
	
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath( savefile );
	if ( file.exists() == false ) {
		file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
		.createInstance( Components.interfaces.nsIFileOutputStream );
	/* Open flags 
	#define PR_RDONLY       0x01
	#define PR_WRONLY       0x02
	#define PR_RDWR         0x04
	#define PR_CREATE_FILE  0x08
	#define PR_APPEND      0x10
	#define PR_TRUNCATE     0x20
	#define PR_SYNC         0x40
	#define PR_EXCL         0x80
	*/
	/*
	** File modes ....
	**
	** CAVEAT: 'mode' is currently only applicable on UNIX platforms.
	** The 'mode' argument may be ignored by PR_Open on other platforms.
	**
	**   00400   Read by owner.
	**   00200   Write by owner.
	**   00100   Execute (search if a directory) by owner.
	**   00040   Read by group.
	**   00020   Write by group.
	**   00010   Execute by group.
	**   00004   Read by others.
	**   00002   Write by others
	**   00001   Execute by others.
	**
	*/
	outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );
	var output = document.getElementById('blog').value;
	var result = outputStream.write( output, output.length );
	outputStream.close();

docuemnt.getElementById('blog').value="";

}


//function reads the saved gadgets in local system and load them into sidebar
function read() {

	
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath( savefile );
	if ( file.exists() == false ) {
		alert("File does not exist");
	}
	var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
		.createInstance( Components.interfaces.nsIFileInputStream );
	is.init( file,0x01, 00004, null);
	var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
		.createInstance( Components.interfaces.nsIScriptableInputStream );
	sis.init( is );
	var output = sis.read( sis.available() );
	document.getElementById('blog').value = output;

        
	document.getElementById('content-1').setAttribute('src',"shree.html");

	document.getElementById('content-1').contentDocument.location.reload(true);
     
}

// for choosing a file from profile directory...
function file(){

const nsIFilePicker = Components.interfaces.nsIFilePicker;



// get the path to the user's home (profile) directory
const DIR_SERVICE = new Components.Constructor("@mozilla.org/file/directory_service;1","nsIProperties");
try { 
	path=(new DIR_SERVICE()).get("ProfD", Components.interfaces.nsIFile).path; 
} catch (e) {
	alert("error");
}



if (path.search(/\\/) != -1) {
	var dataDirPref = path + "\\extensions\\googlegadgets@shree.kant\\content\\";
} else {
	var dataDirPref = path + "/extensions/googlegadgets@shree.kant/content/";
}


//var dataDirPref =path+"/extensions/googlegadgets@shree.kant/content/";

var fp = Components.classes["@mozilla.org/filepicker;1"]
	           .createInstance(nsIFilePicker);


fp.init(window, "Dialog Title", nsIFilePicker.modeOpen);
fp.appendFilters( nsIFilePicker.filterHTML);


var displayDirectory = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		try{
			displayDirectory.initWithPath(dataDirPref);
			if(displayDirectory.exists()){
				fp.displayDirectory = displayDirectory;
			}
		}catch(ex){}
var rv = fp.show();

if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
  var file = fp.file;
  // Get the path as string. Note that you usually won't 
  // need to work with the string paths.
var path = fp.file.path;


var m = path.match(/(.*)[\/\\]([^\/\\]+\.\w+)$/);

document.getElementById('content-1').contentDocument.location=m[2];
}
}

//for opening google gadget directory.
function find()
{
window._content.document.location = "http://www.google.com/ig/directory?synd=open&cat=all";
}
//for opening welcome page in Sidebar...
function help()
{
document.getElementById('content-1').contentDocument.location="welcome.html";
}
function faq()
{
window._content.document.location = "readme.html";
}



