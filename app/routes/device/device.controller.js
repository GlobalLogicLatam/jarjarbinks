function DeviceController() {
  let self = this;

	//Public methods and attributes
  Object.assign( self, {
    link: link,
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
}

module.exports = DeviceController;
