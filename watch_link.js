var util = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) }
if (!process.env.npm_package_config_dir) {
  console.log('please do: npm config set slash-angular-core:dir ../project-dir/');
  return;
}
console.log("using: " + process.env.npm_package_config_dir);
console.log('if you want to change path do: npm config set slash-angular-core:dir ../project-dir/')
exec("mkdir -p "+process.env.npm_package_config_dir+"node_modules/slash-angular-core/dist", puts);
exec("cp -r dist/* "+process.env.npm_package_config_dir+"node_modules/slash-angular-core/dist", puts);
exec("cp package.json "+process.env.npm_package_config_dir+"node_modules/slash-angular-core", puts);
