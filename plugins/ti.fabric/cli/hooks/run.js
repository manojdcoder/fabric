// Export supported versions
exports.cliVersion = '>=3.X';

var TAG = 'TiFabric',
    VERSION = '1.0',
    API_KEY = 'YOUR_API_KEY',
    API_SECRET = 'YOUR_API_SECRET',
    fs = require('fs');

exports.init = function(logger, config, cli, appc) {

	logger.info(TAG + ' : initiated');

	var isProd = (cli.argv['deploy-type'] || cli.argv['deployment-type']) === 'production';

	if (isProd || cli.argv['fabric-enabled'] === 'true') {

		logger.info(TAG + ' : ' + ' initialization enabled');

		var projectDir = cli.argv['project-dir'];

		if (cli.argv['platform'] == 'ios') {

			var modules = cli.tiapp.modules;
			for (var i in modules) {
				var module = modules[i];
				if (module.id == 'ti.fabric') {
					VERSION = module.version;
					break;
				}
			}

			cli.on('build.ios.xcodebuild', {

				pre : function(build, done) {

					try {

						logger.debug(TAG + ' : ' + ' processing fabric for ios');

						var pbxprojPath = projectDir + '/build/iphone/' + cli.tiapp.name + '.xcodeproj/project.pbxproj',
						    pbxprojStr = fs.readFileSync(pbxprojPath).toString(),
						    sectionName = 'Post-Compile',
						    shellScript = '\\nchmod 755 ../../modules/iphone/ti.fabric/' + VERSION + '/platform/Fabric.framework/run\\n../../modules/iphone/ti.fabric/1.0/platform/Fabric.framework/run ' + (cli.argv['fabric-key'] || API_KEY) + ' ' + (cli.argv['fabric-secret'] || API_SECRET);

						var p = 0;
						while (p !== -1) {
							p = pbxprojStr.indexOf('name = "' + sectionName + '"', p);
							if (p !== -1) {
								p = pbxprojStr.indexOf('shellScript = ', p);
								if (p !== -1) {
									pbxprojStr = pbxprojStr.substring(0, p) + 'shellScript = "' + pbxprojStr.substring(p + 'shellScript = '.length + 1, pbxprojStr.indexOf('\n', p) - 2) + shellScript + '";' + pbxprojStr.substring(pbxprojStr.indexOf('\n', p));
								}
							}
						}

						fs.writeFileSync(pbxprojPath, pbxprojStr);

						done();

					} catch(e) {

						logger.error(TAG + ' : ' + e);
						return;

					}

				}
			});

		} else if (cli.argv['platform'] == 'android') {

			cli.on('build.android.writeAndroidManifest', {

				post : function(build, done) {

					try {

						logger.debug(TAG + ' : ' + ' processing fabric for android');

						var buildDir = projectDir + '/build/android/',
						    srcFabricProperties = projectDir + '/plugins/ti.fabric/android/fabric.properties',
						    srcKitsProperties = projectDir + '/plugins/ti.fabric/android/kits.properties',
						    srcCustomRules = projectDir + '/plugins/ti.fabric/android/custom_rules.xml',
						    srcCrashlyticsFld = projectDir + '/plugins/ti.fabric/android/crashlytics';

						fs.writeFileSync(buildDir + 'fabric.properties', fs.readFileSync(srcFabricProperties).toString().replace("API_SECRET", (cli.argv['fabric-secret'] || API_SECRET)));

						fs.writeFileSync(buildDir + 'custom_rules.xml', fs.readFileSync(srcCustomRules).toString().replace("PROJECT_NAME", cli.tiapp.name));

						var fse = require('fs-extra');
						fse.copySync(srcKitsProperties, buildDir + 'kits.properties');
						fse.copySync(srcCrashlyticsFld, buildDir + 'crashlytics');

						done();

					} catch(e) {

						logger.error(TAG + ' : ' + e);
						return;

					}
				}
			});

		}

	}

};
