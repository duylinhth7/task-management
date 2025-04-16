const express = require("express")
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
const database = require("./config/database");
const bodyParser = require('body-parser')
const routeVer1 = require("./api/v1/routes/index.router");
var cors = require('cors')
const port =  process.env.PORT;



database.connect();

app.use(cookieParser())
app.use(cors());
// parse application/json
app.use(bodyParser.json())

routeVer1(app);
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})