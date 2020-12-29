const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foodapp'
});

function getAccountAdmin($userName, $password) {
    pool.getConnection((err, connection) => { 
        $query = 'select * from admin where admin='+ $userName + 'and password=' + $password 
        connection.query($query, (err, rows) => {
            console.log(rows);
            if(!err && rows != 0){
                res.send(true);
            }else{
                res.send(false);
                console.log(err);
            }
        });
        connection.release();
    });
}

module.exports = {
    getAllFood: function(callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * from foods', callback);
            connection.release();
        });
    },
    getFoodById: function($idFood, callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * from foods WHERE id = ?', [$idFood], callback);
            connection.release();
        });
    },
    getAllOrderFood: function(callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * from orderfoods', callback);
            connection.release();
        });
    },
    getUserById: function($idUser, callback) {
        pool.getConnection((err, connection) => { 
            let query = 'SELECT * FROM users WHERE id = ' + $idUser
             connection.query(query, callback);
            connection.release();
        });
    },

    getPaymentById: function($idPayment, callback) {
        pool.getConnection((err, connection) => { 
            connection.query('SELECT * from paymentmethods WHERE id = ?',[$idPayment], callback);
            connection.release();
        });
    }
}


// chuyển mấy cái query db qua đây hết