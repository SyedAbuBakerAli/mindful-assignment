const express = require(`express`);
const app = express();

const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`)

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

//Import all router
const admins = require(`./routes/adminRoute`);
const user = require(`./routes/userRoute`);

app.use(`/mindful`,admins);
app.use(`/mindful`,user);

module.exports = app;