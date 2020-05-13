const capitalize        = require('./functions');

module.exports = function(vscode, fs,pathwork, path, model = false, show = true){
    if (model !== false) {
        var initModel   = `use App\\Models\\${model};`
    }else{
        var initModel   = ""
    }
    vscode.window.showInputBox({
        prompt: "Controller Name",
        placeHolder: "Controller Name"
    }).then(function(val) {
        execute(vscode, fs,pathwork, path, val,initModel, show)
    })
}

function execute(vscode, fs,pathwork, path, val,initModel, show) {
    var value       = val.replace(' ','_');
    var title       = capitalize.capitalize(value)
    var filename	= `${title}.php`
    var pathfile 	= path.join(pathwork + "/app/Controllers/"+filename)
    const controller_create = `<?php 
namespace App\\Controllers;

use CodeIgniter\\Controller;
${initModel}
class ${title} extends Controller{

}`
    fs.access(pathfile, function(err) {
        if (err) {
            fs.open(pathfile, "w+", function(err, fd) {
                if (err) throw err;
                fs.writeFileSync(fd, controller_create)
                if (show === true) {
                    var openPath = vscode.Uri.file(pathfile); //A request file path
                    vscode.workspace.openTextDocument(openPath).then(function(val) {
                        vscode.window.showTextDocument(val);
                    });
                }
            })
            vscode.window.showInformationMessage('Successfully added a controller !');
        }else{
            vscode.window.showWarningMessage("Name already exist !");
        }
    })
}