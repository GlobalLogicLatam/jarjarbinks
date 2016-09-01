function DeviceController( urlParams ) {
  let self = this;

  //TODO do somethings with this
  urlParams;

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
