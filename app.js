const express = require('express')
const middleware = require('./middleware/index')
const indexRouter = require('./routes/index/index')
const signinRouter = require('./routes/login/signin')
const signupRouter = require('./routes/login/signup')
const logoutRouter = require('./routes/login/logout')
const session = require('./middleware/session')

const app = express()
middleware(app)
app.use(session.sessionVariables)
app.use('/',indexRouter,signinRouter,signupRouter,logoutRouter)

module.exports= app
