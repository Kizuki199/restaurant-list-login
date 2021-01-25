// require package used in the project
const express = require("express");
const session = require('express-session')
const exphbs = require("express-handlebars");
const hbsHelpers = require('./helpers/handlebars')
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require('connect-flash')

const routes = require("./routes")

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express();
const port = 3000;

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs", helpers: hbsHelpers }));
app.set("view engine", "hbs");

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));

// setting static files
app.use(express.static("public"));

app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)



// start and listen the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
