var express = require('express'); 
var router = express.Router(); 
var db = require('../models/db'); 

//Hiển thị trang danh sách sản phẩm 
router.get('/products', (req, res) =>{ 
    let sql = 'SELECT * FROM products'; 
      db.query(sql, (err, data) => { 
          if (err) throw err; 
          res.status(200).json(data); 
      }); 
}); 
 
//Hiển thị sản phẩm hot 
router.get('/products/hot', (req, res) =>{ 
    let sql = 'SELECT * FROM products WHERE hot = 1'; 
    db.query(sql, (err, data) => { 
        if (err) throw err; 
        res.status(200).json(data); 
    }); 
}); 
 
//Hiển thị trang chi tiết sản phẩm 
router.get('/productdetail/:id', (req, res) =>{ 
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`; 
    db.query(sql, (err, data) => { 
        if (err) throw err; 
        res.status(200).json(data[0]); 
    }); 
}); 
// Hiển thị trang danh sách sản phẩm sắp xếp theo giá giảm dần
router.get('/products/sorted', (req, res) => {
    let sql = 'SELECT * FROM products ORDER BY price DESC';
    db.query(sql, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
});
module.exports = router; 

