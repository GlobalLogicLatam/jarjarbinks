function DeviceController(urlParams){
  var navBar = require( '../../components/navBar/navBar' );
	let self = this;

  navBar.open(
    {
      title: 'Devices',
      optionButton: { icon: 'glyphicon-menu-hamburger', action: () => { console.log( 'abriendo un menu' ); } },
      actionButtons: [
        { icon: 'glyphicon-filter', action: () => { console.log( 'Hola mundo' ); } },
        { icon: 'glyphicon-calendar', action: () => { console.log( 'Hola mundo' ); } }
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
