// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode 	= require('vscode');
const fs	 	= require('fs')
const path	 	= require('path');
const migration	= require('./commands/migration');
const controller= require('./commands/controller');

let pathwork = vscode.workspace.workspaceFolders[0].uri.fsPath;

function leadZeroHourse(dt) { 
	var date 	= new Date(dt)
	return (date.getHours() < 10 ? '0' : '') + date.getHours();
}
function leadZeroMinute(dt) { 
	return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}
function leadZeroSecond(dt) { 
	return (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
}

function activate(context) {

	let spark_migration = vscode.commands.registerCommand('codeigniter-spark.migration', function () {
		migration(vscode, fs,leadZeroHourse,leadZeroMinute,leadZeroSecond, pathwork, path)
	});
	let spark_controller = vscode.commands.registerCommand('codeigniter-spark.controller', function () {
		controller(vscode, fs,pathwork, path)
	});

	context.subscriptions.push(spark_migration);
	context.subscriptions.push(spark_controller);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
