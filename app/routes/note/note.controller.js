let noteService = require( '../../services/note.service' ),
  publisher = require( '../../components/publisher/publisher' ),
  nav_bar = require( '../../components/navBar/navBar' )();

function NoteController() {
  let self = this,
    selected_items = [];

  // Public methods and attributes
  Object.assign( self, {
    link: link,
    init: init
  } );

  return self;

  /**
   * PUBLIC FUNCTIONS
   */

  // To bind elements
  function link( sammyContext ) {
    $( '.js-note-card' )
      .noteCard( { selectable: true } )
      .on( 'click', function redirect() {
        sammyContext.redirect( `#/notes/${this.dataset.id}` );
      } )
      .on( 'card.selected', function select_handler( event, id ) {
        selected_items.push( id );

        publisher.publish( 'cards.selection', selected_items.length );
      } )
      .on( 'card.unselected', function unselect_handler( event, id ) {
        let index = selected_items.indexOf( id );

        selected_items.splice( index, 1 );
        publisher.publish( 'cards.selection', selected_items.length );
      } );
  }

  // To make calls to apis. It may returns a promise.
  function init( sammyContext ) {

    // On button cancel, rerender navbar and unselect all selected items.
    publisher.subscribe( 'button.cancel', function cancel_handler() {
      nav_bar.renderState( 'default' );
      unselect_all_cards();
    } );

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
      .get( sammyContext.params )
      .then( function show_notes( notes ) {
        self.list = notes;
      } );
  }

    /**
   * PRIVATE FUNCTIONS
   */

  function unselect_all_cards() {
    selected_items = [];
    $( '.card-selected' ).removeClass( 'card-selected' );
  }
}

module.exports = NoteController;
