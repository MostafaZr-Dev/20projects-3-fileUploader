const notfoundHandler = require("./notfound-handler");
const multerErrorhandler = require("./multer-error");

module.exports = (app) => {
  app.use(multerErrorhandler);
  
  app.use(notfoundHandler);
};
