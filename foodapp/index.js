const express = require("express");
const bodyParser = require("body-parser");
const { query } = require("express");

let db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.listen(port, () => console.log("Listen on port", port));

/////////////////    ADMIN    ///////////////////
app.post('/loginadmin/:admin&:password', (req, res) => {
    db.getAdmin(req.params.admin, req.params.password, function (err, rows) {
        res.send(rows);
    });
});

/////////////////     FOOD     ///////////////////

// get all food
app.get("/getallfood", (req, res) => {
  db.getAllFood(function (err, rows) {
    res.send(rows);
  });
});
// get food by id
app.post("/getfood/:id", (req, res) => {
  db.getFoodById(req.params.id, function (err, rows) {
    res.send(rows);
  });
});
// get food by idType
app.post("/getfood/type/:idtype", (req, res) => {
  db.getFoodByIdType(req.params.idtype, function (err, rows) {
    res.send(rows);
  });
});
// // add food
app.post("/addfood", (req, res) => {
  db.addFood(req.body, function (err, rows) {
    res.send(rows);
  });
});
// // update food
app.put("/updatefood/:id", (req, res) => {
  db.updateFood(req.params.id, req.body, function (err, rows) {
    res.send(rows);
  });
});
// // delete food
app.delete("/deletefood/:id", (req, res) => {
  db.deleteFood(req.params.id, function (err, rows) {
    res.send(rows);
  });
});

// //////////////////     ORDER FOOD      ///////////////////

// get all orderfood
app.get("/getallorderfood", (req, res) => {
    db.getAllOrderFood(function (err, rows) {
        res.send(rows);
      });
});
// // get orderfood by iduser
app.post('/getorderfood/:id', (req, res) => {
    db.getOrderFood(req.params.id, function (err, rows) {
        res.send(rows);
      });
});
// // add orderfood
app.post('/addorderfood', (req, res) => {
    db.addOrderFood(req.body, function (err, rows) {
        res.send(rows);
      });
});
// ///////////////////////    PAYMENT METHODS    //////////////////////

// // get all  methods
app.get("/getallpayment", (req, res) => {
  db.getAllPayMent(function (err, rows) {
    res.send(rows);
  });
});
// // get payment methods
app.post('/getpayment/:id', (req, res) => {
    db.getPaymentById(req.params.id, function (err, rows) {
        res.send(rows);
    });
});
// // add payment methods
app.post('/addpayment', (req, res) => {
    db.addPayMent(req.body, function (err, rows) {
        res.send(rows);
    });
});
// // update payment methods
app.put('/updatepayment/:id', (req, res) => {
    db.updatePayMent(req.params.id, req.body, function (err, rows) {
        res.send(rows);
      });
});
// // delete payment methods
app.delete('/deletepayment/:id', (req, res) => {
    db.deletePayMent(req.params.id, function (err, rows) {
        res.send(rows);
      });
});

// ///////////////////////    RATINGS    //////////////////////

// // get all ratings
app.get('/getallrating', (req, res) => {
    db.addRating(function (err, rows) {
        res.send(rows);
      });
});
// // get rating by idfood
app.post('/getrating/:idfood', (req, res) => {
    db.getRatingByIdFood(req.params.idfood, function (err, rows) {
        res.send(rows);
      });
});
// // add rating
app.post('/addrating', (req, res) => {
    db.addRating(req.body, function (err, rows) {
        res.send(rows);
      });
});

// //////////////////    TYPE FOOD   ///////////////////

// // get all type
app.get("/getalltypefood", (req, res) => {
  db.getAllTypeFood(function (err, rows) {
    res.send(rows);
  });
});
// // get type
app.post('/gettypefood/:id', (req, res) => {
    db.getTypeFoodById(req.params.id, function (err, rows) {
        res.send(rows);
      });
});
// // add type
app.post('/addtypefood', (req, res) => {
    db.addTypeFood(req.body, function (err, rows) {
        res.send(rows);
      });
});
// // update type
app.put('/updatetypefood/:id', (req, res) => {
    db.updateTypeFood(req.params.id, req.body, function (err, rows) {
        res.send(rows);
      });
});
// // delete type
app.delete('/deletetypefood/:id', (req, res) => {
    db.deleteTypeFood(req.params.id, function (err, rows) {
        res.send(rows);
      });
});

// //////////////////     USER     /////////////////////

// // get all user
app.get("/getalluser", (req, res) => {
  db.getAllUser(function (err, rows) {
    res.send(rows);
  });
});
// // get user by email and password
app.post('/getuser/:email&:password', (req, res) => {
    db.getUserByEmail(req.params.email,req.params.password, function (err, rows) {
        res.send(rows);
      });
});

// get user by email
app.post('/getuserbyid/:id', (req, res) => {
  db.getUserByIdUser(req.params.id, function (err, rows) {
      res.send(rows);
    });
});
// // add user
app.post('/adduser', (req, res) => {
    db.addUser(req.body, function (err, rows) {
        res.send(rows);
      });
});
// // update thông tin cá nhân
app.put('/updateuser/info/:id', (req, res) => {
    db.updateInfoUser(req.params.id, req.body, function (err, rows) {
        res.send(rows);
      });
});
// // update hình ảnh cá nhân
app.put('/updateuser/img/:id', (req, res) => {
    db.updateInfoUser(req.params.id, req.body, function (err, rows) {
        res.send(rows);
      });
});

///////////////     VOUCHERS     ////////////////

// // get all vouchers
app.get('/getallvoucher', (req, res) => {
    db.getAllVoucher(function (err, rows) {
        res.send(rows);
      });
});
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
