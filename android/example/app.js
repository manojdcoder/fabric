var win = Ti.UI.createWindow({
	backgroundColor : "white"
});

win.open();

var crashlytics = require("ti.crashlytics");
crashlytics.init("API_KEY");
crashlytics.setDebugMode(false);

crashlytics.setUserIdentifier("tirocks");
crashlytics.setUserName("titanium");
crashlytics.setUserEmail("ti@appc.com");

crashlytics.setObject("myObj", {
	name : "Appcelerator",
	product : "Titanium"
});
crashlytics.setInt("myInt", 24);
crashlytics.setBool("myBool", true);
crashlytics.setFloat("myFloat", 24.25);

var button = Ti.UI.createButton({
	title : "Crash App"
});
button.addEventListener("click", function(e) {
	crashlytics.leaveBreadcrumb("app is crashing now through crash method");
	crashlytics.crash();
});

win.add(button);