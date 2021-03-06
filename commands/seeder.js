const capitalize        = require('./functions');

module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Seeder Name",
        placeHolder: "Seeder Name"
    }).then(function(val) {
        vscode.window.showInputBox({
            prompt: "Define the table name",
            placeHolder: "Table Name"
        }).then(function(table_name) {
            var filename	= `${val}.php`
            var pathfile 	= path.join(pathwork + "/app/Database/Seeds/"+filename)
            const controller_create = `<?php 
namespace App\\Database\\Seeds;

class ${capitalize.capitalize(val)} extends \\CodeIgniter\\Database\\Seeder{
    public function run(){
        $data = [
            
        ];

        $this->db->table('${table_name}')->insert($data);
    }
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
                    vscode.window.showInformationMessage('Successfully added a seeder !');
                }else{
                    vscode.window.showWarningMessage("Name already exist !");
                }
            })
        })
    })
}