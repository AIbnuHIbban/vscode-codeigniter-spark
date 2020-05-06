const capitalize        = require('./functions');

module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Controller Name",
        placeHolder: "Controller Name"
    }).then(function(val) {
        var value       = val.replace(' ','_');
        var title       = capitalize.capitalize(value)
        var filename	= `${title}.php`
        var pathfile 	= path.join(pathwork + "/app/Controllers/"+filename)
        const controller_create = `<?php 
namespace App\\Controllers;

use CodeIgniter\\Controller;

class ${title} extends Controller{

}`
        fs.access(pathfile, function(err) {
            if (err) {
                fs.open(pathfile, "w+", function(err, fd) {
                    if (err) throw err;
                    fs.writeFileSync(fd, controller_create)
                    // fs.close(fd)
                    var openPath = vscode.Uri.file(pathfile); //A request file path
                    vscode.workspace.openTextDocument(openPath).then(function(val) {
                        vscode.window.showTextDocument(val);
    
                    });
                })
                vscode.window.showInformationMessage('Berhasil Menambah Controller !');
            }else{
                vscode.window.showWarningMessage("Nama Sudah Ada!");
            }
        })
        
    })
}