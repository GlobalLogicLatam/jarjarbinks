const routes = [
  {
    url: '#/login',
    template: 'routes/login/login.template.mustache',
    controller: 'routes/login/login.controller',
    controllerAs: 'login'
  },
  {
    url: '#/',
    template: 'routes/device/device.template.mustache',
    controller: 'routes/device/device.controller',
    controllerAs: 'devices'
  }
];

module.exports = routes;
