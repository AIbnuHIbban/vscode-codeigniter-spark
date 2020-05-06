module.exports = function(vscode, fs, leadZeroHourse, leadZeroMinute, leadZeroSecond, pathwork, path){
    vscode.window.showInputBox({
        prompt: "name of table",
        placeHolder: "name of table"
    }).then(function(val) {
        var date 	 	= new Date()
        var time		= leadZeroHourse(date)+leadZeroMinute(date)+leadZeroSecond(date)
        var format		= date.getFullYear()+"-0"+date.getMonth().toString().slice(-2)+"-0"+date.getDate().toString().slice(-2)+"-"+time
        var filename	= `${format}_${val}.php`
        var pathfile 	= path.join(pathwork + "/app/Database/Migrations/"+filename)
        const migration_create = `<?php 
    namespace App\\Database\\Migrations;
    
    use CodeIgniter\\Database\\Migration;
    
    class User extends Migration{
    public function up(){
    
    //
    // $this->forge->addField([
    // 		'id'          		=> [
    // 				'type'           => 'INT',
    // 				'unsigned'       => TRUE,
    // 				'auto_increment' => TRUE
    // 		],
    // 		'title'       		=> [
    // 				'type'           => 'VARCHAR',
    // 				'constraint'     => '100',
    // 		],
    // ]);
    // $this->forge->addKey('id', TRUE);
    $this->forge->createTable('${val}');
    }
    
    public function down(){
    $this->forge->dropTable('${val}');
    }
    }`
        fs.access(pathfile, function(err) {
            if (err) {
                fs.open(pathfile, "w+", function(err, fd) {
                    if (err) throw err;
                    fs.writeFileSync(fd, migration_create)
                    // fs.close(fd)
                    var openPath = vscode.Uri.file(pathfile); //A request file path
    
                    vscode.workspace.openTextDocument(openPath).then(function(val) {
                        vscode.window.showTextDocument(val);
    
                    });
                })
                vscode.window.showInformationMessage('Berhasil ! ');
            }else{
                vscode.window.showWarningMessage("Nama Sudah Ada!");
            }
        })
        
    })
}