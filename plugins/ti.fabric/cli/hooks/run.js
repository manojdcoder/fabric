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

		if (cli.argv['platform'] == 'ios' || cli.argv['platform'] == 'iphone' || cli.argv['platform'] == 'ipad') {

			var modules = cli.tiapp.modules;
			for (var i in modules) {
				var module = modules[i];
				if (module.id == 'ti.fabric' && module.version) {
					VERSION = module.version;
					break;
				}
			}

			cli.on('build.ios.xcodebuild', {


				pre : function(build, done) {

					logger.debug('executing build.ios.xcodebuild pre hook');

					try {

						logger.debug(TAG + ' : ' + ' processing fabric for ios - version ' + VERSION);

						var pbxprojPath = projectDir + '/build/iphone/' + cli.tiapp.name + '.xcodeproj/project.pbxproj',
							pbxprojStr = fs.readFileSync(pbxprojPath).toString(),
							shellScript = '\\nchmod 755 ../../modules/iphone/ti.fabric/' + VERSION + '/platform/Fabric.framework/run\\n../../modules/iphone/ti.fabric/' + VERSION + '/platform/Fabric.framework/run ' + (cli.argv['fabric-key'] || API_KEY) + ' ' + (cli.argv['fabric-secret'] || API_SECRET);

						var OUR_UNIQUE_KEY = '636363C2C2C2C2C2C2C2C2C2';
						var p = 0;

						p = pbxprojStr.indexOf('Begin PBXNativeTarget section', p);

						if(p !== -1){
							var endPbxNativeTargetSectionIndex = pbxprojStr.indexOf('End PBXNativeTarget section', p);

							p = pbxprojStr.indexOf('buildPhases', p);
							if(p !== -1 && p < endPbxNativeTargetSectionIndex){
								logger.debug('adding the build phase');

								var targetClosingBracketIndex = pbxprojStr.indexOf(');', p);
								pbxprojStr = pbxprojStr.substring(0, targetClosingBracketIndex-1) + OUR_UNIQUE_KEY + ' /* ShellScript */, \n' + pbxprojStr.substring(targetClosingBracketIndex);

								// okay, now add the script
								p = pbxprojStr.indexOf('/* End PBXShellScriptBuildPhase section */', p);

								if(p == -1){
									throw 'no PBXShellScriptBuildPhase section found'
								}

								var shellScriptSection = '\n' + OUR_UNIQUE_KEY + ' /* ShellScript */ = {\n' +
									'isa = PBXShellScriptBuildPhase;\n' +
									'buildActionMask = 2147483647;\n' +
									'files = (\n' +
									');\n' +
									'inputPaths = (\n' +
									');\n' +
									'outputPaths = (\n' +
									');\n' +
									'runOnlyForDeploymentPostprocessing = 0;\n' +
									'shellPath = /bin/sh;\n' +
									'shellScript = "' + shellScript + '";\n};\n' ;

								pbxprojStr = pbxprojStr.substring(0, p-1) + shellScriptSection + pbxprojStr.substring(p);

							} else {
								throw 'no PBXProject.targets found';
							}
						} else {
							throw 'no PBXProject section found. Operation aborted.';
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

	} else {
		logger.error('Fabric not enabled for this build');
	}

};
