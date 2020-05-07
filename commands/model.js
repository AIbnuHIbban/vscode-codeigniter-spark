const migration     = require('./migration')

module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Model Name",
        placeHolder: "Model Name"
    }).then(function(model_name) {
        vscode.window.showInputBox({
            prompt: "Define the table name",
            placeHolder: "Table Name"
        }).then(async (table_name) =>  {
            const answ_migration    = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: "Also create migration for this model ?",
            });
            // const answ_controller   = await vscode.window.showQuickPick(['Yes', 'No'], {
            //     placeHolder: "Also create controller for this model ?",
            // });
            if (answ_migration == "Yes") {
                execute(vscode, fs, pathwork, path, model_name, table_name)
                migration(vscode, fs, pathwork, path, table_name)
            }else{
                execute(vscode, fs, pathwork, path, model_name, table_name)
            }
        })
    })
}

function execute(vscode, fs, pathwork, path, model_name, table_name) {
    var filename	= `${model_name}.php`
    var pathfile 	= path.join(pathwork + "/app/Models/"+filename)
    
    const controller_create = `<?php 
namespace App\\Models;

use CodeIgniter\\Model;

class UserModel extends Model{
    protected $table      = '${table_name}';
    // Uncomment below if you want add primary key
    // protected $primaryKey = 'id';
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
            vscode.window.showInformationMessage('Successfully added a model !');
        }else{
            vscode.window.showWarningMessage("Name already exist !");
        }
    })
}