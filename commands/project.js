const shell = require('./functions')

module.exports.new = function (vscode,fs,pathwork,path) {
    let NEXT_TERM_ID = 1;
    vscode.window.showInputBox({
        
        prompt: "Project/Folder Name",
        placeHolder: "Project/Folder Name"
        
    }).then(function(val) {
        const terminal  = vscode.window.createTerminal(`Spark Project #${NEXT_TERM_ID++}`);
        var filename	= `index.html`
        var pathfile 	= path.join(pathwork +'/'+val+"/app/"+filename)

        terminal.sendText(`composer create-project codeigniter4/appstarter ${val}`);
        vscode.window.showInformationMessage('Creating Project...')
        terminal.show();
        var intv = setInterval(function(){ 
            fs.access(pathfile, function(err) {
                if (!err) {
                    vscode.window.showInformationMessage('Project Created!')
                    clearInterval(intv)
                    terminal.hide();
                    setTimeout(function(){
                        terminal.sendText(`code -r ${val}`);
                    },2000)
                }
            })
        }, 2000);
    })
    
}