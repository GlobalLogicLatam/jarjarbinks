function card() {

  $.fn.card = function card_component( config ) {
    let self = this;

    // Open Card Options Menu
    this.find( '.card__dropdown-button' ).on( 'click', function open_menu() {
      $( this ).addClass( 'card__dropdown--open' );
    } );


    // Close Card Options Menu
    this.find( '.card__dropdown-background' ).off().on( 'click', function close_menu( e ) {
      e.stopPropagation();
      if ( e.target === e.currentTarget ) {
        $( '.card__dropdown--open' ).removeClass( 'card__dropdown--open' );
      }
    } );

    if ( config.selectable ) {
      select();
    }

    return this;

    // Select Card on Long Press
    function select() {
      self.on( 'longclick', function on_selected() {
        $( this ).toggleClass( 'card-selected' );
      } );
    }

  };

}

module.exports = card
