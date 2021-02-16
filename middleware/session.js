const session = require('express-session');
const FileStore = require('session-file-store')(session);


module.exports.sessionVariables = (req, res, next) => {
      if (req.session.name) {
          res.locals.login = true;   
          res.locals.userName = req.session.name;    ///????
          next()
      } else {
          next()
      }
  };
