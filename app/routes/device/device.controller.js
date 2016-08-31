function DeviceController() {
  const navBar = require( '../../components/navBar/navBar' );
  let self = this;

  navBar.open(
    {
      title: 'Devices',
      optionButton: { icon: 'glyphicon-menu-hamburger', action: () => {
        // eslint-disable-next-line no-console
        console.log( 'abriendo un menu' );
      } },
      actionButtons: [
        { icon: 'glyphicon-filter', action: () => {
          // eslint-disable-next-line no-console
          console.log( 'Hola mundo' );
        } },
        { icon: 'glyphicon-calendar', action: () => {
          // eslint-disable-next-line no-console
          console.log( 'Hola mundo' );
        } }
      ]
    }
  );

	//Public methods and attributes
  Object.assign( self, {
    link: link,
    unlink: unlink,
    init: init,
    name: 'myName'
  } );

  return self;

	// //PUBLIC FUNCTIONS
	// To bind elements
  function link() {

  }

	// To make calls to apis. It may returns a promise.
  function init() {

  }

  function unlink() {
    // eslint-disable-next-line no-console
    console.log( 'Unlink device!!' );
  }
}

module.exports = DeviceController;
