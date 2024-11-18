require("dotenv").config()
const express = require('express')
var methodOverride = require('method-override')
const path = require("path")
const database = require("./config/database");
const route = require("./routes/client/index.route") //day la 1 ham route
const routeAdmin = require("./routes/admin/index.route")
const port = process.env.PORT
const systemConfig = require("./config/system")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const moment = require('moment')
const app = express()

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
//flash
app.use(cookieParser('1HuyOnly1'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
//begin tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.set('views', `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))
//end tinymce
database.connect();
app.set('view engine', 'pug')
//app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment
route(app)
routeAdmin(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})