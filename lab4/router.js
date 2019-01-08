var express = require('express');
var router = express.Router();

var db = [];

router.get('/', function(req, res){
    res.send('Welcome to FIT2095 Home Page');
 });

router.get('/newItem/:name/:quantity/:price', function(req, res){
    var id = Math.round(Math.random()*1000);
    var newItem = {
        newId:id,
        newName:req.params.name,
        quantity:req.params.quantity,
        price:req.params.price
    };
    db.push(newItem);
    res.send(db);
});

router.get('/listItems', function(req, res){
   res.send(generateList());
});
router.get('/deleteItem/:id', function(req, res){
    for(var count= 0; count < db.length; count++){
        if(db[count].newId ==req.params.id){
            db.splice(count, 1);
        }
    }
    res.send(generateList());
 });
router.get('/totalPrice', function(req, res){
     var totalPrice =0;
     for(var i= 0; i < db.length; i++){
        totalPrice += (db[i].quantity*db[i].price);
    }
    res.send('total value is: '+totalPrice);
 });

function generateList() {
    var st = 'ID    |   Name    |   Quantity    |   Price($)    |   Cost($) </br>';
    for (var i = 0; i < db.length; i++) {
        st += db[i].newId+' |   ' + db[i].newName + '   |   ' + db[i].quantity + '  |   ' + db[i].price + ' |   ' + db[i].quantity*db[i].price +' </br> ';
    }
    return st;
}
//export this router 
module.exports = router;