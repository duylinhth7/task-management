const express = require("express")
const app = express();
require('dotenv').config();
const database = require("./config/database");
database.connect();
const port =  process.env.PORT;
const route = require("./api/v1/routes/index.router");
route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})