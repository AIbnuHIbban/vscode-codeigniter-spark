module.exports = function(vscode, fs,pathwork, path){
    vscode.window.showInputBox({
        prompt: "Views File Name ",
        placeHolder: "Views File Name"
    }).then(async(val) => {
        const answ_refresh    = await vscode.window.showQuickPick(['Yes', 'No'], {
            placeHolder: "Create HTML Structure ?",
        });
        if (answ_refresh == "Yes") {
            execute(vscode, fs,pathwork, path, val,true)
        }else{
            execute(vscode, fs,pathwork, path, val)
        }
    })
}

function execute(vscode, fs,pathwork, path, val, html = false) {
    var value       = val.replace(' ','_');
    var check       = value.includes("php");
    if (check) {
        var filename	= `${value}`
    }else{
        var filename	= `${value}.php`
    }
    // filename.split('.').pop();   if Want Check  Extension File
    var pathfile 	= path.join(pathwork + "/app/Views/"+filename)
    var views_file
    if (html === true) {
        views_file= `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    
</body>
</html>`
    }else{
        views_file= ``
    }
    fs.access(pathfile, function(err) {
        if (err) {
            fs.open(pathfile, "w+", function(err, fd) {
                if (err) throw err;
                fs.writeFileSync(fd, views_file)
                var openPath = vscode.Uri.file(pathfile); //A request file path
                vscode.workspace.openTextDocument(openPath).then(function(val) {
                    vscode.window.showTextDocument(val);
                });
            })
            vscode.window.showInformationMessage('Successfully added a views file !');
        }else{
            vscode.window.showWarningMessage("Name already exist !");
        }
    })
}