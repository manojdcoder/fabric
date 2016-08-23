var OS_IOS = Ti.Platform.name == "iPhone OS";

var win = Ti.UI.createWindow({
	backgroundColor : "white"
});
win.open();

var Fabric = require("ti.fabric");

//debug mode is false by default
Fabric.Crashlytics.setDebugMode(false);

//returns true if initialization is successful (only on android)
var initated = Fabric.init();

Ti.API.info("Fabric.Crashlytics.version : " + Fabric.Crashlytics.version);

if (OS_IOS || initated) {

	Fabric.Crashlytics.setUserIdentifier("tirocks");
	Fabric.Crashlytics.setUserName("titanium");
	Fabric.Crashlytics.setUserEmail("ti@appc.com");

	Fabric.Crashlytics.setInt("myInt", 24);
	Fabric.Crashlytics.setBool("myBool", true);
	Fabric.Crashlytics.setFloat("myFloat", 24.25);

	if (OS_IOS) {
		Fabric.Crashlytics.setObject("myObj", {
			name : "Appcelerator",
			product : "Titanium"
		});
	} else {
		Fabric.Crashlytics.setString("myString", "I'm only with android");
		Fabric.Crashlytics.setDouble("myDouble", 92.2425);
		try {
			throw new Error("Log Handled Exception");
		} catch(error) {
			Fabric.Crashlytics.logException(error);
		}
	}

} else {

	Ti.API.error("Something wrong with your fabric configuration");

}

var button = Ti.UI.createButton({
	title : "Crash App"
});
button.addEventListener("click", function(e) {
	if (OS_IOS || initated) {
		if (!OS_IOS) {
			Fabric.Crashlytics.leaveBreadcrumb({
				level : Fabric.Crashlytics.LOG_LEVEL_ERROR,
				tag : "Example",
				message : "only on android"
			});
		}
		Fabric.Crashlytics.leaveBreadcrumb("app is crashing now through crash method");
		Fabric.Crashlytics.crash();
	}
});
win.add(button);


var logSignupBtn = Ti.UI.createButton({
	title : “Log Signup Event”
});
logSignupBtn.addEventListener("click", function(e) {

	Fabric.Answers.logSignUpWithMethod({
		method:’signup-button’,
		success: true
	});
});
win.add(logSignupBtn);


var logPurchaseBtn = Ti.UI.createButton({
	title : “Log Purchase Event”
});
logPurchaseBtn.addEventListener("click", function(e) {

   Fabric.Answers.logPurchaseWithPrice({
	‘itemPrice’: ’22.99’,
	‘currency’: ‘USD’,
	‘success’: true,
	‘itemName’: ‘Answers Shirt’,
	‘itemType’: ‘Apparel’,
	‘itemId’: ’sku-350’
	‘customAttributes’: {'demoName' : 'demoValue'}
   });

});
win.add(logPurchaseBtn);

var logCustomEventBtn = Ti.UI.createButton({
	title : “Log Custom Event”
});
logCustomEventBtn.addEventListener("click", function(e) {

   Fabric.Answers.logCustomEventWithName({
	‘name’: ’SomeCustomEventName’,
	‘customAttributes’: {‘customEvtName' : ‘customValue'}
   });

});
win.add(logCustomEventBtn);

