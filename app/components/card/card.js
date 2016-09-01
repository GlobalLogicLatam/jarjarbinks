function card() {

  $.fn.card = function( config ) {
    //this = $(".js-card")
    let self = this;
    // Open Card Options Menu
    this.find( '.card__dropdown-button' ).on( 'click', function() {
      $( this ).addClass( 'card__dropdown--open' );
    } );


    // Close Card Options Menu
    this.find( '.card__dropdown-background' ).off().on( 'click', function( e ) {
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
      self.mouseup( function() {
        clearTimeout( pressTimer );
        // Clear timeout
        return false;
      } ).mousedown( function( e ) {
          // Set timeout
        pressTimer = window.setTimeout( function() {
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
