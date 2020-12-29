// const mysql = require('mysql');
// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'foodapp'
// });


// function getUserById($idUser) {
//     connection.query('SELECT * from users WHERE id = ?',[req.params.id], (err, rows) => {
//         connection.release();
//         if(!err && rows == 1){
//             return rows[0]
//         }else{
//             console.log(err)
//         }
//     });
// }