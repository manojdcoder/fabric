#Twitter Fabric

plugin
------
Copy the folder [ti.fabric](./plugins/ti.fabric) to the plugins directory of your app. If it is a classic project you may have to create one. 

Then replace the keys in [ti.fabric/hooks/run.js](./plugins/ti.fabric/cli/hooks/run.js#L6)

```
    API_KEY = 'YOUR_API_KEY',
    API_SECRET = 'YOUR_API_SECRET', 
 ```
 
<b>OR</b>

Send the keys as parameters for build command

###example

```appc run --platform ios --fabric-key xxxx --fabric-secret xxx --log-level debug```

<b>Note:</b> By default only production builds are uploaded to fabric dashboard, to make devlopment builds visible you may have to enable it by setting `fabric-enabled` flag to `true`

###example

```appc run --platform ios --fabric-enabled true --fabric-key xxxx --fabric-secret xxx --log-level debug```

tiapp.xml
---------
```
   <ios>
        <plist>
            <dict>
                <key>Fabric</key>
                <dict>
                    <key>APIKey</key>
                    <string>YOUR_API_KEY</string>
                    <key>Kits</key>
                    <array>
                        <dict>
                            <key>KitInfo</key>
                            <dict/>
                            <key>KitName</key>
                            <string>Crashlytics</string>
                        </dict>
                    </array>
                </dict>
            </dict>
        </plist>
    </ios>
    ....
    ....
    ....
    <plugins>
        <plugin version="1.0">ti.alloy</plugin>
        <plugin>ti.fabric</plugin>
    </plugins>
```

## Usage

```javascript
var OS_IOS = Ti.Platform.name == "iPhone OS";

var win = Ti.UI.createWindow({
	backgroundColor : "white"
});
win.open();

var Fabric = require("ti.fabric");

if (OS_IOS) {
	Fabric.Crashlytics.setDebugMode(false);
}

Fabric.init();

Ti.API.info("Fabric.Crashlytics.version : " + Fabric.Crashlytics.version);

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
}

if (!OS_IOS) {
	Fabric.Crashlytics.setString("myString", "I'm only with android");
	Fabric.Crashlytics.setDouble("myDouble", 92.2425);
	try {
		throw new Error("Log Handled Exception");
	} catch(error) {
		Fabric.Crashlytics.logException(error);
	}
}

var button = Ti.UI.createButton({
	title : "Crash App"
});
button.addEventListener("click", function(e) {
	Fabric.Crashlytics.leaveBreadcrumb("app is crashing now through crash method");
	Fabric.Crashlytics.crash();
});
win.add(button);
```