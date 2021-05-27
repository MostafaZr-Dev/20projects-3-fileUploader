module.exports = (app) => {
  app.use((req, res, next) => {
    const errors = req.flash("errors");
    const hasError = errors ? errors.length > 0 : false;

    const message = req.flash("message").pop();

    res.renderPage = (template, options = {}) => {
      options = {
        ...options,
        flash: {
          errors,
          hasError,
          message,
          hasMessage: message ? true : false,
        },
      };
      
      res.render(template, options);
    };

    next();
  });
};
