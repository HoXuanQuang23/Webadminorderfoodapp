const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// const db = require("db");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.listen(port, () => console.log('Listen on port', port));

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foodapp'
});



/////////////////    ADMIN    ///////////////////


app.post('/loginadmin/:admin&:password', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId)
        console.log(req.params.admin);
        console.log(req.params.password);
        $query = 'select * from admin where admin='+ req.params.admin + 'and password=' + req.params.password 
        connection.query($query, (err, rows) => {
            console.log(rows);
            if(!err && rows != 0){
                res.send(true);
            }else{
                res.send(false);
                console.log(err);
            }
        });
        console.release();
    });
});

/////////////////     FOOD     ///////////////////


// get all food
app.get('/getallfood', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId)
        connection.query('SELECT * from foods', (err, rows) => {
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        });
        console.release();
    });
});
// get food
app.get('/getfood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        return res.send(getFoodById(req.params.id));
    });
});
// add food
app.post('/addfood', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const params = req.body;
        connection.query('INSERT INTO foods SET ?', params , (err, rows) => {
            if(!err){
                res.send('New food has been added');
            }else{
                console.log(err);
            }
        });
        console.release();
    });
});
// update food
app.put('/updatefood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {id, idtype, name, price, img} = req.body;
        connection.query('UPDATE foods SET idtype = ?, name = ?, price = ?, img = ? WHERE id = ?', [idtype,name, price, img, id] , (err, rows) => {
            
            if(!err){
                res.send('Food has been updated!');
            }else{
                console.log(err);
            }
        });
        console.release();
    });
});
// delete food
app.delete('/deletefood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('DELETE from foods WHERE id = ?',[req.params.id], (err, rows) => {
            if(!err){
                res.send('Food has been deleted !');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});

//////////////////     ORDER FOOD      ///////////////////


// get all orderfood
app.get('/getallorderfood', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        $arrayObj = []
        console.log('connected as id', connection.threadId);
        connection.query('SELECT * from orderfoods', (err, rows) => {
            if(!err){
                // res.send(rows)
                for (i = 0; i < rows.length; i++) {
                   $arrayObj.push(convertOrderFoodObj(queryUser(rows[i].iduser),queryPayment(row[i].$idpayment), queryFood(row[i].idfood), row[i].$total, row[i].$status));
                }
                return $arrayObj;
            }else{
                console.log(err);
            }
        });
        console.release();

    });
});

function queryUser($userID) {
    $result = getUserById($userID);
    return $result;
}

function getUserById($idUser) {
    connection.query('SELECT * from users WHERE id = ?',[req.params.id], (err, rows) => {
        if(!err && rows == 1){
            return rows[0];
        }else{
            console.log(err);
        }
    });
    console.release();
}

function queryFood($foodID) {
    $result = getFoodById($foodID);
    return $result;
}

function getFoodById($idFood) {
    connection.query('SELECT * from foods WHERE id = ?',[req.params.id], (err, rows) => {
        if(!err && rows == 1){
            return rows[0];
        }else{
            console.log(err);
        }
    });
    console.release();
}

function queryPayment($paymentID) {
    $result = getPaymentById($paymentID);
    return $result;
}

function getPaymentById($idPayment) {
    connection.query('SELECT * from paymentmethods WHERE id = ?',[req.params.id], (err, rows) => {
        connection.release();
        if(!err){
            res.send(rows);
        }else{
            connection.log(err);
        }
    });
    console.release();
}

// function convertOrderFoodObj($user, $payment, $food, $total, $status) {
//     $objOrderFood = {
//         $user = {
//             id: $user.id,
//             email: $user.email,
//             name: $user.name,
//             phone:$user.phone,
//             address:$$user.address,
//         },
//         $payment = {
//             id: $payment.id,
//             name: $payment.name,
//         },
//         $food = {
//             id: $food.id,
//             name: $food.name,
//             price: $food.price,
//         },
//         $total,
//         $status,
//     };
//     return $objOrderFood;
// };

// get orderfood
app.get('/getorderfood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('SELECT * from orderfoods WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release();
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// add orderfood
app.post('/addorderfood', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const params = req.body;
        connection.query('INSERT INTO orderfoods SET ?', params , (err, rows) => {
            if(!err){
                res.send('New order food has been added');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// update orderfood
app.put('/updateorderfood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {id, code, description, discount, datestart, dateend} = req.body;
        connection.query('UPDATE orderfoods SET code = ?, description = ?, discount = ?, datestart = ?, dateend = ? WHERE id = ?'
        , [code, description, discount, datestart, dateend, id] , (err, rows) => {
            if(!err){
                res.send('Order food has been updated!');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// delete voucher
app.delete('/deleteorderfood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('DELETE from orderfoods WHERE id = ?',[req.params.id], (err, rows) => {
            if(!err){
                res.send('Order food has been deleted !');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});


///////////////////////    PAYMENT METHODS    //////////////////////

// get all payment methods
app.get('/getallpayment', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('SELECT * from paymentmethods', (err, rows) => {
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// get payment methods
app.get('/getpayment/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        return res.send(getPaymentById(req.params.id));
    });
});
// add payment methods
app.post('/addpayment', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const params = req.body;
        connection.query('INSERT INTO paymentmethods SET ?', params , (err, rows) => {
            if(!err){
                res.send('New payment method has been added');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// update payment methods
app.put('/updatepayment/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {id, name, img} = req.body;
        connection.query('UPDATE paymentmethods SET name = ? WHERE id = ?', [name, id] , (err, rows) => {
            if(!err){
                res.send('Payment method has been updated!')
            }else{
                connection.log(err)
            }
        });
        console.release();
    });
});
// delete payment methods
app.delete('/deletepayment/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('DELETE from paymentmethods WHERE id = ?',[req.params.id], (err, rows) => {
            if(!err){
                res.send('Payment method has been deleted !');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});


///////////////////////    RATINGS    //////////////////////

// get all ratings
app.get('/getallrating', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('SELECT * from ratings', (err, rows) => {
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// get rating by idfood
app.get('/getrating/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {idfood} = req.body;
        connection.query('SELECT * from ratings WHERE idfood = ?',[idfood], (err, rows) => {
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// add rating
app.post('/addrating', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId)
        const params = req.body;
        connection.query('INSERT INTO rating SET ?', params , (err, rows) => {
            if(!err){
                res.send('New rating has been added');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});

//////////////////    TYPE FOOD   ///////////////////

// get all type
app.get('/getalltypefood', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId)
        connection.query('SELECT * from typefoods', (err, rows) => {
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// get type
app.get('/gettypefood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('SELECT * from typefoods WHERE id = ?',[req.params.id], (err, rows) => {
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// add type
app.post('/addtypefood', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const params = req.body;
        connection.query('INSERT INTO typefoods SET ?', params , (err, rows) => {
            if(!err){
                res.send('New type has been added');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// update type
app.put('/updatetypefood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {id, name, img} = req.body;
        connection.query('UPDATE typefood SET name = ?, img = ? WHERE id = ?', [name, img, id] , (err, rows) => {
            if(!err){
                res.send('Type has been updated!');
            }else{
                connection.log(err);
            }
        });
        connection.release();
    });
});
// delete type
app.delete('/deletetypefood/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('DELETE from typefoods WHERE id = ?',[req.params.id], (err, rows) => {
            if(!err){
                res.send('Type has been deleted !');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});



//////////////////     USER     /////////////////////

// get all user 
app.get('/getalluser', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        connection.query('SELECT * from users', (err, rows) => {
            console.log(rows);
            if(!err){
                res.send(rows);
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// get user
app.get('/getuser/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        return res.send(getUserById(req.params.id));
    });
});
// add user
app.post('/adduser', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const params = req.body;
        connection.query('INSERT INTO users SET ?', params , (err, rows) => {
            if(!err){
                res.send('New user has been added');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// update thông tin cá nhân
app.put('/updateuser/info/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {id, name, password, phone, address} = req.body;
        connection.query('UPDATE paymentmethods SET name = ?, password = ?, phone = ?, address = ? WHERE id = ?', [name, password, phone, address, id] , (err, rows) => {
            if(!err){
                res.send('Information of user has been updated!');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});
// update hình ảnh cá nhân
app.put('/updateuser/img/:id', (req, res) => { 
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id', connection.threadId);
        const {id, img} = req.body;
        connection.query('UPDATE paymentmethods SET img = ? WHERE id = ?', [img, id] , (err, rows) => {
            if(!err){
                res.send('Image of user has been updated!');
            }else{
                connection.log(err);
            }
        });
        console.release();
    });
});

///////////////     VOUCHERS     ////////////////


// // get all vouchers
// app.get('/getallvoucher', (req, res) => { 
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id', connection.threadId)
//         connection.query('SELECT * from vouchers', (err, rows) => {
//             connection.release();
//             if(!err){
//                 res.send(rows)
//             }else{
//                 connection.log(err)
//             }
//         });
//     });
// });
// // get voucher
// app.get('/getvoucher/:id', (req, res) => { 
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id', connection.threadId)
//         connection.query('SELECT * from vouchers WHERE id = ?',[req.params.id], (err, rows) => {
//             connection.release();
//             if(!err){
//                 res.send(rows)
//             }else{
//                 connection.log(err)
//             }
//         });
//     });
// });
// // add voucher
// app.post('/addvoucher', (req, res) => { 
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id', connection.threadId)
//         const params = req.body;
//         connection.query('INSERT INTO vouchers SET ?', params , (err, rows) => {
//             connection.release();
//             if(!err){
//                 res.send('New voucher has been added')
//             }else{
//                 connection.log(err)
//             }
//         });
//     });
// });
// // update voucher
// app.put('/updatevoucher/:id', (req, res) => { 
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id', connection.threadId)
//         const {id, code, description, discount, datestart, dateend} = req.body;
//         connection.query('UPDATE vouchers SET code = ?, description = ?, discount = ?, datestart = ?, dateend = ? WHERE id = ?'
//         , [code, description, discount, datestart, dateend, id] , (err, rows) => {
//             connection.release();
//             if(!err){
//                 res.send('Voucher has been updated!')
//             }else{
//                 connection.log(err)
//             }
//         });
//     });
// });
// // delete voucher
// app.delete('/deletevoucher/:id', (req, res) => { 
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id', connection.threadId)
        
//         connection.query('DELETE from vouchers WHERE id = ?',[req.params.id], (err, rows) => {
//             connection.release();
//             if(!err){
//                 res.send('Voucher has been deleted !')
//             }else{
//                 connection.log(err)
//             }
//         });
//     });
// });


