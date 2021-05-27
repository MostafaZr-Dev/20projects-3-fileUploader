const express = require("express");

const boot = require("./boot");
const appRouter = require("./router");
const bootDatabase = require("./boot/database/sequelize");
const errorHandler = require("./middlewares/exception-handling");

const app = express();

app.set("port", process.env.APP_PORT);

boot(app);
bootDatabase.connection();

app.use("/", appRouter);

errorHandler(app);

const runApp = (port) => {
  app.listen(port, () => {
    console.log(`app runnig on http://localhost:${port}...`);
  });
};

module.exports = runApp;
