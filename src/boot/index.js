const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const flashMessage = require("../middlewares/flash-messages");

module.exports = (app) => {
  app.use(cookieParser());
  app.use(
    session({
      secret: "4h341l3h4u3hulerhleuwh4j32io4jo2i3j4o23",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    })
  );

  app.use(flash());

  app.set("views", `${__dirname}/../views`);
  app.engine(
    ".hbs",
    handlebars({
      layoutsDir: `${__dirname}/../views/layouts`,
      partialsDir: `${__dirname}/../views/partials`,
      extname: ".hbs",
    })
  );

  app.set("view engine", ".hbs");

  app.use(express.static("public"));

  flashMessage(app);
};
