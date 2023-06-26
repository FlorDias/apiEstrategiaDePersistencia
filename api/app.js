var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Sincronización de modelos

var carrerasRouter = require('./routes/carreras');
var materiasRouter = require('./routes/materias');
var alumnosRouter = require('./routes/alumnos');
var profesorRouter = require('./routes/profesores');
var usuariosRouter = require('./routes/usuarios');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));


app.use('/car', carrerasRouter);
app.use('/mat', materiasRouter);
app.use('/alu', alumnosRouter);
app.use('/pro', profesorRouter);
app.use('/usu', usuariosRouter);
app.use('/',require('./routes/view'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{message: err.message});
});

module.exports = app;
