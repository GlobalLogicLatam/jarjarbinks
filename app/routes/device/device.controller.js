function DeviceController(urlParams){
  var navBar = require( '../../components/navBar/navBar' )();
	let self = this;

  navBar.open(
    {
      title: 'Devices',
      backActions: Promise.resolve( () => alert( 'volviendo' ) ),
      actionButtons: [
        { icon: 'glyphicon-filter', action: () => alert( 'Hola mundo' ) },
        { icon: 'glyphicon-calendar', action: () => alert( 'Hola mundo' ) }
      ]
    }
  );

	//Public methods and attributes
	Object.assign(self, {
		link: 	link,
		init: 	init
	});

	return self;

	// //PUBLIC FUNCTIONS
	// To bind elements
	function link(){

	};

	// To make calls to apis. It may returns a promise.
	function init(){

	};
}

module.exports = DeviceController;
