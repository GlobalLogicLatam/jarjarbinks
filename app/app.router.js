function Router(SammyContext) {

  SammyContext.mapRoutes([
    ['#/', require('./routes/home/home.controller.js')],
    ['#/login', require('./routes/login/login.controller.js')]
  ]);

}

module.exports = Router