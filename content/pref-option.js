var savefile = "pref.txt";
//Selects A file for making default gadgets

function file1(){

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
fp.appendFilters(nsIFilePicker.filterHTML);


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

document.getElementById('symbol').setAttribute('value', m[2]);

//document.getElementById('content-1').contentDocument.location=m[2];
}
}








//saves the selected file name in pref.tex so that at staring browse can  load the default file
function save1() {

var str= document.getElementById('symbol').value;


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
	var output = str;

	var result = outputStream.write( output, output.length );
	outputStream.close();

}

// loads the default file at loading the browse.
function load()
{


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
savefile = path+"pref.txt";

	
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath( savefile );
	if ( file.exists() == false ) {
	
	}
	var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
		.createInstance( Components.interfaces.nsIFileInputStream );
	is.init( file,0x01, 00004, null);
	var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
		.createInstance( Components.interfaces.nsIScriptableInputStream );
	sis.init( is );
	var output = sis.read( sis.available() );
	
    

document.getElementById('content-1').contentDocument.location=output;
   
}

