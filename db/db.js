const mysql = require("mysql");

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:"kutuphane"

});

db.connect(function(err)
{
    if(err)
        console.log('Veritabanına bağlanırken bir sorun oluştu'+err);
    else
        console.log('Veritabanina başarıyla bağlanıldı');
});





module.exports= db