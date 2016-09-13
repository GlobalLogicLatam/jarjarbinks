/**
 * Created by gaston on 8/9/16.
 */
function NoteController() {
  let self = this,
    navBar = require( '../../components/navBar/navBar' );

  navBar.setTitle( 'Nota' );
  navBar.addActionButton( { icon: 'glyphicon-trash', action: () => alert( 'Hola mundo' ) } );
  // eslint-disable-next-line no-console
  navBar.addBackAction( () => console.log( 'volviendo...' ) );
  navBar.open();

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
      .noteCard( { selectable: true } )
      .on( 'click', function redirect() {
        sammyContext.redirect( `#/notes/${this.dataset.id}` );
      } );
  }

  // To make calls to apis. It may returns a promise.
  function init() {

  }
}

module.exports = NoteController;
