function card() {

  $.fn.card = function card_component( config ) {
    let self = this;

    // Toggle Card
    this.find( '.card__collapse' ).on( 'click', function collapse_card( e ) {

      let osToggle = e.currentTarget.dataset.ostoggle;

      $( e.currentTarget ).find( 'i' ).toggleClass( 'glyphicon-chevron-up glyphicon-chevron-down' );
      $( '[data-oscard=' + osToggle + ']' ).toggle( function collapse( ) { } );
    } );


    // Open Card Options Menu
    this.find( '.card__dropdown-button' ).on( 'click', function open_menu( e ) {
      e.stopPropagation();
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
        let card = $( this ),
          id = card.data( 'id' );

        if ( card.hasClass( 'card-selected' ) ) {
          card.removeClass( 'card-selected' );
          card.trigger( 'card.unselected', id );
        } else {
          card.addClass( 'card-selected' );
          card.trigger( 'card.selected', id );
        }
      } );
    }

  };
}

module.exports = card
