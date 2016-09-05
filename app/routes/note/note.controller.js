let noteService = require( '../../services/note.service' );

function NoteController() {
  let self = this;

  //Public methods and attributes
  Object.assign( self, {
    link: link,
    init: init
  } );

  return self;

  // //PUBLIC FUNCTIONS
  // To bind elements
  function link( sammyContext ) {
    $( '.js-note-card' )
      .noteCard( {} )
      .on( 'click', function() {
        sammyContext.redirect( `#/notes/${this.dataset.id}` );
      } );
  }

  // To make calls to apis. It may returns a promise.
  function init() {
    // Temporary call to create devices.
    noteService
      .post( {
        title: 'Titulo A',
        date: '15/02/2016',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        createdBy: {
          id: '992',
          lastName: 'Smith',
          name: 'John',
          username: 'jsmith',
          avatar: 'https://avatars.io/twitter/jeff'
        }
      } );

    return noteService
      .get()
      .then( function show_notes( notes ) {
        self.list = notes;
      } );
  }
}

module.exports = NoteController;
