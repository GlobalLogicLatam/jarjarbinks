const routes = [
  {
    url: '#/login',
    template: 'routes/login/login.template.mustache',
    controller: 'routes/login/login.controller',
    controllerAs: 'login'
  }, {
    url: '#/',
    template: 'routes/device/device.template.mustache',
    controller: 'routes/device/device.controller',
    controllerAs: 'devices',
    navOptions: {
      title: 'Devices',
      states: {
        default: [
          'back', 'calendar', 'filter'
        ],
        selected: [
          'cancel', 'edit', 'delete'
        ],
        multipleSelected: [ 'cancel', 'delete' ]
      }
    }
  }, {
    url: '#/notes',
    template: 'routes/note/note.template.mustache',
    controller: 'routes/note/note.controller',
    controllerAs: 'notes',
    navOptions: {
      title: 'Notes',
      states: {
        default: [
          'back', 'info', 'add'
        ],
        selected: [
          'cancel', 'edit', 'delete'
        ],
        multipleSelected: [ 'cancel', 'delete' ]
      }
    }
  }, {
    url: '#/notes/:id',
    template: 'routes/note/note.template.mustache',
    controller: 'routes/note/note.controller',
    controllerAs: 'notes',
    navOptions: {
      title: 'Notes',
      states: {
        default: [ 'back', 'edit', 'delete' ]
      }
    }
  }, {
    url: '#/detail',
    template: 'routes/detail/detail.template.mustache',
    controller: 'routes/detail/detail.controller',
    controllerAs: 'detail',
    navOptions: {
      title: 'Detail',
      states: {
        default: [ 'back' ]
      }
    }
  }, {
    url: '#/detail/:id',
    template: 'routes/detail/detail.template.mustache',
    controller: 'routes/detail/detail.controller',
    controllerAs: 'detail',
    navOptions: {
      title: 'Detail',
      states: {
        default: [ 'back' ]
      }
    }
  }
];
module.exports = routes;
