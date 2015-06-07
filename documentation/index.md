#Crashlytics

## Description

Add Twitter Fabric / Crashlytics to your app

## Usage

```javascript
var isIOS = Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad";

var win = Ti.UI.createWindow({
	backgroundColor : "white"
});

win.open();

var crashlytics = require("ti.crashlytics");

if (isIOS) {
	crashlytics.setDebugMode(false);
	crashlytics.init("API_KEY");
} else {
	/**
	 * Key should be set as meta data in manifest section of tiapp.xml
	 * <android xmlns:android="http://schemas.android.com/apk/res/android">
	 *   <manifest>
	 *       <application>
	 *       	<meta-data android:name="io.fabric.ApiKey" android:value="API_KEY"/>
	 *       </application>
	 *   </manifest>
	 * </android>
	 **/
	crashlytics.init();
}

Ti.API.info("Crashlytics Version : " + crashlytics.version);

crashlytics.setUserIdentifier("tirocks");
crashlytics.setUserName("titanium");
crashlytics.setUserEmail("ti@appc.com");

crashlytics.setInt("myInt", 24);
crashlytics.setBool("myBool", true);
crashlytics.setFloat("myFloat", 24.25);

if (isIOS) {
	crashlytics.setObject("myObj", {
		name : "Appcelerator",
		product : "Titanium"
	});
}

if (!isIOS) {
	crashlytics.setString("myString", "I'm only with android");
	crashlytics.setDouble("myDouble", 92.2425);
	try {
		throw new Error("Log Handled Exception");
	} catch(error) {
		crashlytics.logException(error);
	}
}

var button = Ti.UI.createButton({
	title : "Crash App"
});
button.addEventListener("click", function(e) {
	crashlytics.leaveBreadcrumb("app is crashing now through crash method");
	crashlytics.crash();
});

win.add(button); 
```