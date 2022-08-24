const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db.js");
const router = require('./router/router.js') 


const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();

app.use('/',router);

app.listen(process.env.PORT, () => {

    app.listen(5001, () => console.log("running at 5001 port"));/**/

})

