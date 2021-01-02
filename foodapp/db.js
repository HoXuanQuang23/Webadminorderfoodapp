const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foodapp'
});

module.exports = {
    getAdmin: function($userName, $password, callback) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            $query = 'select * from admin where admin='+ $userName + 'and password=' + $password;
            connection.query($query, callback);
            connection.release();
        });
    },
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
            connection.query('SELECT * from foods WHERE id = ?', $idFood, callback);
            connection.release();
        });
    },
    addFood: function(params, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO foods SET ?', params , callback);
            connection.release();
        });
    },
    updateFood: function($idFood, params, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('UPDATE foods SET ? WHERE id = ?', [params, $idFood] , callback);
            connection.release();
        });
    },
    deleteFood: function($idFood, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('DELETE from foods WHERE id = ?', $idFood, callback);
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
    getOrderFood: function($idUser, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * from orderfoods WHERE iduser = ?', $idUser, callback);
            connection.release();
        });
    },
    addOrderFood: function(params, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO orderfoods SET ?', params, callback); 
            connection.release();
        });
    },
    getAllPayMent: function(callback){
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * from paymentmethods', callback);
            connection.release();
        });
    },
    getPaymentById: function($idPayment, callback) {
        pool.getConnection((err, connection) => { 
            if (err) throw err;
            connection.query('SELECT * from paymentmethods WHERE id = ?', $idPayment, callback);
            connection.release();
        });
    },
    addPayMent: function($namePayment, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO paymentmethods SET ?', $namePayment , callback);
            connection.release();
        });
    },
    updatePayMent: function($idPayment, $namePayment, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('UPDATE paymentmethods SET name = ? WHERE id = ?', [$namePayment, $idPayment] , callback);
            connection.release();
        });
    },
    deletePayMent: function($idPayment, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('DELETE from paymentmethods WHERE id = ?', $idPayment, callback);
            connection.release();
        });
    },
    getAllTypeFood: function(callback){
        pool.getConnection((err, connection) => {
            if(err) throw err
            connection.query('SELECT * from typefoods', callback); 
            connection.release();
        });
    },
    getTypeFoodById: function($idType, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * from typefoods WHERE id = ?', $idType , callback);
            connection.release();
        });
    },
    addTypeFood: function(params, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO typefoods SET ?', params , callback);
            connection.release();
        });
    },
    updateTypeFood: function($idType, params, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('UPDATE typefoods SET ? WHERE id = ?', [params, $idType] , callback);
            connection.release();
        });
    },
    deleteTypeFood: function($idType, callback){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('DELETE from typefoods WHERE id = ?',  $idType , callback);
            connection.release();
        });
    },
    getAllUser: function(callback){
        pool.getConnection((err, connection) => {
            if(err) throw err
            connection.query('SELECT * from users', callback);
            connection.release();
        });
    },
    getUserById: function($idUser, callback) {
        pool.getConnection((err, connection) => { 
            if (err) throw err;
            connection.query('SELECT * FROM users WHERE id = ?',$idUser, callback);
            connection.release();
        });
    },
    addUser: function(params, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO users SET ?', params , callback);
            connection.release();
        });
    },
    updateInfoUser: function($idUser, params, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('UPDATE users SET ? WHERE id = ?', [params, $idUser] , callback);
            connection.release();
        });
    },
    updateImgUser: function($idUser, $img, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('UPDATE users SET ? WHERE id = ?', [$img, $idUser] , callback);
            connection.release();
        });
    },
    getAllRating: function(callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * from ratings', callback);
        });
    },
    addRating: function(params, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('INSERT INTO ratings SET ?', params , callback);
            connection.release();
        });
    },
    getRatingByIdFood: function($idFood, callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * from ratings WHERE idfood = ?', $idFood, callback);
            connection.release();
        });
    },
    getAllVoucher: function(callback) {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            connection.query('SELECT * from vouchers',callback);
            connection.release();
        });
    },
}


// chuyển mấy cái query db qua đây hết