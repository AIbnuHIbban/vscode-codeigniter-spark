const vscode 	= require('vscode');
const fs	 	= require('fs')
const path	 	= require('path');
const migration	= require('./commands/migration');
const controller= require('./commands/controller');
const model		= require('./commands/model');
const migrate	= require('./commands/migrate');
const rollback	= require('./commands/rollback');
const serve		= require('./commands/serve');
const seeder	= require('./commands/seeder');
const router	= require('./commands/route');



let pathwork = vscode.workspace.workspaceFolders[0].uri.fsPath;

function activate(context) {

	
	let spark_migration 	= vscode.commands.registerCommand('spark.migration', function () {
		migration(vscode, fs, pathwork, path)
	});
	let spark_controller 	= vscode.commands.registerCommand('spark.controller', function () {
		controller(vscode, fs,pathwork, path)
	});
	let spark_model 		= vscode.commands.registerCommand('spark.model', function () {
		model(vscode, fs,pathwork, path)
	});
	let spark_migrate		= vscode.commands.registerCommand('spark.migrate', function () {
		migrate(vscode)
	})
	let spark_migrate_roll	= vscode.commands.registerCommand('spark.migrate.rollback', function () {
		rollback(vscode)
	})
	let spark_start_serve	= vscode.commands.registerCommand('spark.serve.start', function () {
		serve.start(vscode)
	})
	let spark_stop_serve	= vscode.commands.registerCommand('spark.serve.stop', function () {
		serve.stop(vscode)
	})
	let spark_restart_serve	= vscode.commands.registerCommand('spark.serve.restart', function () {
		serve.restart(vscode)
	})
	let spark_seeder		= vscode.commands.registerCommand('spark.seeder', function () {
		seeder(vscode,fs,pathwork,path)
	})
	let spark_router		= vscode.commands.registerCommand('spark.router', function () {
		router(vscode,fs,pathwork,path)
	})
	
	context.subscriptions.push(spark_migration);
	context.subscriptions.push(spark_controller);
	context.subscriptions.push(spark_model);
	context.subscriptions.push(spark_migrate);
	context.subscriptions.push(spark_migrate_roll);
	context.subscriptions.push(spark_start_serve);
	context.subscriptions.push(spark_stop_serve);
	context.subscriptions.push(spark_restart_serve);
	context.subscriptions.push(spark_seeder);
	context.subscriptions.push(spark_router);

}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
