const shell = require('./functions')

module.exports = async (vscode) => {
    let NEXT_TERM_ID = 1;
    const answ_refresh    = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: "Also Refresh Migrate ?",
    });
    if (answ_refresh == "Yes") {
        const terminal  = vscode.window.createTerminal(`Spark Migrate #${NEXT_TERM_ID++}`);
        terminal.sendText("php spark migrate:refresh");
        vscode.window.showInformationMessage('Successfuly Refresh Migrate')
        shell.closeTerminal(terminal)
    }else{
        const terminal  = vscode.window.createTerminal(`Spark Migrate #${NEXT_TERM_ID++}`);
        terminal.sendText("php spark migrate");
        vscode.window.showInformationMessage('Successfuly Migrate')
        shell.closeTerminal(terminal)
    }
    
}