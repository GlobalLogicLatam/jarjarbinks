function card() {

  $.fn.card = function card_component( config ) {
    //this = $(".js-card")
    let self = this;
    // Open Card Options Menu
    this.find( '.card__dropdown-button' ).on( 'click', function open_option_menu( e ) {
      e.stopPropagation();
      $( this ).addClass( 'card__dropdown--open' );
    } );


    // Close Card Options Menu
    this.find( '.card__dropdown-background' ).off().on( 'click', function open_option_menu( e ) {
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
      var pressTimer;
      self.mouseup( function mouseup_handler() {
        clearTimeout( pressTimer );
        // Clear timeout
        return false;
      } ).mousedown( function mousedown_handler( e ) {
          // Set timeout
        pressTimer = window.setTimeout( function select_toggle() {
          var $jsCard = $( e.target.closest( '.js-card' ) );
          if ( $jsCard.hasClass( 'card-selected' ) ) {
            $jsCard.removeClass( 'card-selected' );
          } else {
            $jsCard.addClass( 'card-selected' );
          }
        }, 500 );
        return false;
      } );
    }
  };
}

module.exports = card
