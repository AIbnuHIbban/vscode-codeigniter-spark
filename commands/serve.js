
const shell 	= require('./functions')
var terminal 	= {}
module.exports.start = function (vscode
	) {
	let NEXT_TERM_ID = 1;
	terminal 	= vscode.window.createTerminal(`Spark Serve ${NEXT_TERM_ID}`);
	if (process.platform === "linux") {
		var run_chrome	= "xdg-open http://localhost:8080;"

	}else if(process.platform === "win32"){
		var run_chrome	= "start http://localhost:8080;"
	}
	terminal.sendText(`${run_chrome} php spark serve`);
	vscode.window.showInformationMessage('Successfuly Run Spark Server On http://localhost:8080')
}

module.exports.stop = function (vscode) {
	shell.closeTerminal(terminal)
	vscode.window.showInformationMessage('Successfuly Stop Spark Server')
}

module.exports.restart = function (vscode) {
	if (terminal === null) {
		vscode.window.showWarningMessage("Server not running !");
	}else{
		shell.closeTerminal(terminal)
		let NEXT_TERM_ID 	= 1;
		terminal 			= vscode.window.createTerminal(`Spark Serve ${NEXT_TERM_ID}`);
		if (process.platform === "linux") {
			var run_chrome	= "xdg-open http://localhost:8080;"
		}else if(process.platform === "win32"){
			var run_chrome	= "start http://localhost:8080;"
		}
		terminal.sendText(`${run_chrome} php spark serve`);
		vscode.window.showInformationMessage('Successfuly Restart Spark Server')
	}
}