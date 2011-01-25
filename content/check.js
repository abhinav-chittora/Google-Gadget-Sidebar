var savefile="pref.txt";
function makedefault()
{
	
		var path=document.getElementById('content-1').contentDocument.location;
	var a=path.href.substring(path.href.lastIndexOf('/')+1);
	alert(a);
		save2(a);
	
}

function save2(str) {
alert(str);


	
	const DIR_SERVICE = new Components.Constructor("@mozilla.org/file/directory_service;1","nsIProperties");
try { 
	path=(new DIR_SERVICE()).get("ProfD", Components.interfaces.nsIFile).path; 
} catch (e) {
	alert("error");
}

	
	if (path.search(/\\/) != -1) {
	path = path + "\\extensions\\googlegadgets@shree.kant\\content\\";
} else {
	path = path + "/extensions/googlegadgets@shree.kant/content/";
}
savefile = path+savefile;
alert(savefile);
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath( savefile );
	if ( file.exists() == false ) {
	
		file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance( Components.interfaces.nsIFileOutputStream );
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
	*/	var output = str;
	outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );

	var result = outputStream.write( output, output.length );
	alert(result);
	outputStream.close();


}


