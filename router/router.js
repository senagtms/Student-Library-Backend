const express = require("express");
const db = require("../db/db.js")
const router= express.Router()

/* Anasayfa */
router.get("/", /* <=== endpoint*/ (req,res)=>{
    res.json({message : "ben response öğreniyorum"});

})

/* users  */
router.get("/users", /* <=== endpoint*/ (req,res)=>{ 
    getData("Select * from users")
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post("/createUsers",(req,res)=>{
    const data = [req.body.name,req.body.email,req.body.tel]
    saveData("INSERT INTO users (name, email, tel) VALUES (?,?,?)",data)
    .then(result=>{
        res.json(result);
        console.log("Kaydedildi")
    })
    .catch(err=>res.json(err))
})

router.patch("/updateUser/:id", (req,res)=>{

    const data = [req.body.name,req.body.email,req.body.tel, req.params.id]
    saveData("Update users Set name=?, email=?, tel=? where id=?" , data)
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})

router.get("/updateUser/:id", (req,res)=>{
    const data =[req.params.id]
    saveData("select name,email,tel FROM users WHERE id=?",data)
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})


router.delete("/users/:id",(req,res)=>{
    const data= [req.params.id];
    saveData("DELETE FROM users WHERE id = ? ",data)
    .then(result=>res.json(result))
    .catch(err=> res.json(err));
    

})
/* users */

/* books */
router.get("/books", (req,res)=>{
    getData("select * from books")
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post("/createBooks",(req,res)=>{
    const data= [req.body.title,req.body.author,req.body.summary]
    saveData("INSERT INTO books (title, author, summary) VALUES (?,?,?)",data)
    .then(result=>{
        res.json(result);
        console.log("Kaydedildi")
    })
    .catch(err=>res.json(err))
})

/* books */



router.get("/deposit",(req,res)=>{
    const sql = `
        SELECT deposit.id as depositid,userid,bookid, name, title, expiretime,status FROM deposit
        INNER JOIN users ON users.id = deposit.userid
        INNER JOIN books ON books.id = deposit.bookid
    `;  
    getData(sql)
    .then(result=>{
        console.log(result)
        res.json(result)
    })
    .catch(err=> res.json(err))
}) 

router.patch("/deposit/:id", ( req,res)=>{
    const data= [req.body.status,req.params.id]
    saveData("Update deposit Set status=? where id=? ",data)
    .then(result=>{
        res.json(result)
    })
    .catch(err=> res.json(err))
})

router.post("/deposit",(req,res)=>{
    const data= [req.body.userid,req.body.bookid,req.body.date]
    saveData("Insert Into deposit (userid, bookid, expiretime) Values (?,?,?)",data)
    .then(result=>{
        res.json(result)
    })
    .catch(err=> res.json(err))
})


router.delete("/deposit/:id",(req,res)=>{
    const data = [req.params.id]
    saveData("DELETE FROM deposit WHERE id = ?",data)
    .then(result=>{
        res.json(result)
    })
    .catch(err=> res.json(err))
})




const getData = sql => {
    return new Promise((resolve,reject) => {
        db.query(sql, (err,result)=>{
            if(err){
                reject(err)
            }
            else{
    
                resolve(result)
            }
        }) 
    })
}

const saveData = (sql,data) => {
    return new Promise((resolve,reject) => {
        db.query(sql,data,(err, results, fields) =>{
            if(err){
                reject(err)
            }
            else{
                console.log('Row inserted:' + results.affectedRows);
                resolve(results)
            }
        }) 
    })
}
module.exports = router 