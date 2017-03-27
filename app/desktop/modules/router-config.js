const routes = [
  {
    url: '#/login',
    template: 'routes/login/login.template.mustache',
    controller: 'routes/login/login.controller',
    controllerAs: 'login'
  },
  {
    url: '#/logout',
    template: 'routes/logout/logout.template.mustache',
    controller: 'routes/logout/logout.controller'
  },
  {
    url: '#/',
    template: 'routes/device/device.template.mustache',
    controller: 'routes/device/device.controller',
    controllerAs: 'devices'
  }
];

module.exports = routes;
