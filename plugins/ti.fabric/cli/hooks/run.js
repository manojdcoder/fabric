// Export supported versions
exports.cliVersion = '>=3.X';

var TAG = 'TiFabric',
    VERSION = '1.0',
    API_KEY = 'YOUR_API_KEY',
    API_SECRET = 'YOUR_API_SECRET',
    fs = require('fs');

exports.init = function(logger, config, cli, appc) {

	logger.info(TAG + ' : initiated');

	var isProd = (cli.argv['deploy-type'] || cli.argv['deployment-type']) === 'production',
	    projectDir = cli.argv['project-dir'];

	if (isProd || cli.argv['fabric-enabled'] === 'true') {

		logger.info(TAG + ' : ' + ' initialization enabled');

		cli.on('build.ios.xcodebuild', {

			pre : function(build, done) {

				try {

					var path = projectDir + '/build/iphone/' + cli.tiapp.name + '.xcodeproj/project.pbxproj',
					    proj = fs.readFileSync(path).toString(),
					    sectionName = 'Post-Compile',
					    shellScript = '\\nchmod 755 ../../modules/iphone/ti.fabric/' + VERSION + '/platform/Fabric.framework/run\\n../../modules/iphone/ti.fabric/1.0/platform/Fabric.framework/run ' + (cli.argv['fabric-key'] || API_KEY) + ' ' + (cli.argv['fabric-secret'] || API_SECRET);

					var p = 0;
					while (p !== -1) {
						p = proj.indexOf('name = "' + sectionName + '"', p);
						if (p !== -1) {
							p = proj.indexOf('shellScript = ', p);
							if (p !== -1) {
								proj = proj.substring(0, p) + 'shellScript = "' + proj.substring(p + 'shellScript = '.length + 1, proj.indexOf('\n', p) - 2) + shellScript + '";' + proj.substring(proj.indexOf('\n', p));
							}
						}
					}

					fs.writeFileSync(path, proj);

					done();

				} catch(e) {

					logger.error(TAG + ' : ' + e);
					return;

				}

			}
		});

	}

};
