const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(require("./routes/administradores"));
app.use(require("./routes/colaboradores"));
app.use(require("./routes/incentivos"));


module.exports = app;