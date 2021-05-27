require("dotenv").config();

const runApp = require("./src/app");

const port  = process.env.APP_PORT;

runApp(port);