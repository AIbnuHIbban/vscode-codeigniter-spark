const vscode 	= require('vscode');
const fs	 	= require('fs')
const path	 	= require('path');
const migration	= require('./commands/migration');
const controller= require('./commands/controller');
const model		= require('./commands/model');


let pathwork = vscode.workspace.workspaceFolders[0].uri.fsPath;

function activate(context) {

	let spark_migration 	= vscode.commands.registerCommand('codeigniter-spark.migration', function () {
		migration(vscode, fs, pathwork, path)
	});
	let spark_controller 	= vscode.commands.registerCommand('codeigniter-spark.controller', function () {
		controller(vscode, fs,pathwork, path)
	});
	let spark_model 		= vscode.commands.registerCommand('codeigniter-spark.model', function () {
		model(vscode, fs,pathwork, path)
	});

	context.subscriptions.push(spark_migration);
	context.subscriptions.push(spark_controller);
	context.subscriptions.push(spark_model);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
