var express = require("express"),
	ssi		= require("ssi"),
	path 	= require("path"),
	fs 		= require("fs"),
	app 	= express(),
	
	parser 		= new ssi(__dirname, "", "");
	
// Handle server side includes for html files
app.use(function(req,res,next) {
	var filename 	= __dirname+(req.path == "/" ? "/index.shtml" : req.path);

	if(fs.existsSync(filename)) {
		res.send(parser.parse(filename, fs.readFileSync(filename, {encoding: "utf8"})).contents);	
	} else {
		next();
	}
});


app.listen(process.env.PORT || 3001)