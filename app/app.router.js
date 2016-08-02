function Router(SammyContext) {

  SammyContext.mapRoutes([
    ['#/', require('./routes/home/home.controller.js')],
    ['#/login', require('./routes/login/login.controller.js')],
    ['#/devices', require('./routes/device/device.controller.js')]
  ]);

}

module.exports = Router