module.exports = function (app) {
  const session = require('express-session')
  const cookieParser = require('cookie-parser')
  const express = require('express')
  const FileStore = require('session-file-store')(session)
  const hbs = require('hbs')
  const path = require('path')
  const morgan = require('morgan')
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/klad', { useNewUrlParser: true, useUnifiedTopology: true });

  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', 'views'))   
  app.set(hbs.registerPartials(path.join(__dirname,'../views/partials')));
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use(morgan('dev'))
  app.use(cookieParser())

  app.use(session({
    name: 'user_sid',
    resave: false,
    saveUninitialized: false,
    secret: 'klad',
    store: new FileStore(),
    cookie: {
      maxAge: 1000000,
      httpOnly: true
    }
  }))

}
