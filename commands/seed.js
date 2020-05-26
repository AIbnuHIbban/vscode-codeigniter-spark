const shell = require('./functions')

module.exports = function (vscode, fs,pathwork, path){
    let NEXT_TERM_ID = 1;

    vscode.window.showInputBox({
        prompt: "Seeder Class Name",
        placeHolder: "Seeder Class Name"
    }).then(function(val) {
        var filename	= `${val}.php`
        var pathfile 	= path.join(pathwork + "/app/Database/Seeds/"+filename)
        fs.access(pathfile, function(err) {
            if (!err) {
                const terminal  = vscode.window.createTerminal(`Spark Seed #${NEXT_TERM_ID++}`);
                terminal.sendText(`php spark db:seed ${val}`);
                vscode.window.showInformationMessage('Successfuly Run Seed')
                setTimeout(function(){shell.closeTerminal(terminal)},12000)
            }else{
                vscode.window.showWarningMessage("Seeder Not Found!");
            }
        })
    })
}