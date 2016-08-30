const routes = [
  {
    url: '#/',
    template: './routes/home/home.template.mustache',
    controller: './routes/home/home.controller',
    controllerAs: 'home'
  },
  {
    url: '#/login',
    template: './routes/login/login.template.mustache',
    controller: './routes/login/login.controller',
    controllerAs: 'login'
  },
  {
    url: '#/devices',
    template: './routes/device/device.template.mustache',
    controller: './routes/device/device.controller',
    controllerAs: 'devices'
  }
];

module.exports = routes;
