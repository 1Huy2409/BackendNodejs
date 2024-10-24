// cau hinh express
require("dotenv").config()
const express = require('express')
var methodOverride = require('method-override')
const database = require("./config/database");
const route = require("./routes/client/index.route") //day la 1 ham route
const routeAdmin = require("./routes/admin/index.route")
const port = process.env.PORT
const systemConfig = require("./config/system")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const app = express()

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
//flash
app.use(cookieParser('1HuyOnly1'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
//nhung file database vao va goi ham connect
//route cua client
//route cua admin
database.connect();
app.set('views', `${__dirname}/views`) //di vao thu muc view
app.set('view engine', 'pug') //su dung pug
//app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
route(app)
routeAdmin(app)
//nhung export tu route vao 
//goi den route
app.use(express.static(`${__dirname}/public`))
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})