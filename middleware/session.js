const session = require('express-session');
const FileStore = require('session-file-store')(session);
const User = require('../models/user')

module.exports.sessionVariables = async (req, res, next) => {
      if (req.session.name) {
        const candidate = await User.findOne({ email: req.session.email })
          res.locals.login = true;   
          res.locals.userName = req.session.name;
          res.locals.coin=candidate.coin    ///????
          next()
      } else {
          next()
      }
  };
