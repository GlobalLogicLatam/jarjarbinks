let require_factory = require( 'modules/require-factory' );

function ModalFactory() {
  let self = {},
    modalWrapper,
    promise = {},
    modalHtml,
    options = {
      content: {},
      templateUrl: 'components/modal/modal.template.mustache',
      buttons: {
        accept: {
          classes: 'btn btn--primary btn--small',
          label: 'Aceptar',
          callback: close,
          selector: 'js-modal__accept'
        }
      }
    },
    body = $( 'body' );

    //Public methods and attributes
  Object.assign( self, {
    message: message,
    confirm: confirm,
    custom: custom
  } );


  return self;

    // Public Functions

  function message( params ) {
    return self.custom( params );
  }

  function confirm( params ) {
    params.buttons = params.buttons || {
      accept: {
        classes: 'btn btn--primary btn--small',
        label: 'Aceptar',
        callback: close,
        selector: 'js-modal__accept'
      },
      cancel: {
        classes: 'btn btn--primary btn--small',
        label: 'Cancelar',
        callback: close,
        selector: 'js-modal__cancel'
      }
    }
    return self.custom( params );
  }

    /**
     * params: templateUrl, templateHtml, content, buttons
     */
  function custom( params ) {
    _init();
    Object.assign( options, params );
    modalHtml = '';
    modalHtml = params.templateHtml || require_factory( options.templateUrl );
    modalHtml = Mustache.render( modalHtml, params.content );
    modalWrapper.html( modalHtml );
    _addButtons();
    _bindEvents();
    modalWrapper.addClass( 'modal--show' );
    return new Promise( function modalPromise( resolve, reject ) {
      promise.resolve = resolve;
      promise.reject = reject;
    } );
  }

    // Private Functions


    /**
     *
     */
  function _init() {
    if ( !modalWrapper ) {
      modalWrapper = $( '<div id="modal-wrapper" class="modal-wrapper"></div>' );
      body.append( modalWrapper );
    }
  }

  function _addButtons() {
    var keys = [],
      buttonsHtml = '';
    for ( let key in options.buttons ) {
      if ( options.buttons.hasOwnProperty( key ) ) {
        keys.push( key )
      }
    }

    keys.forEach( function addButton( button ) {
      buttonsHtml += '<button class="' + options.buttons[ button ].classes + ' ' + options.buttons[ button ].selector + '">' + options.buttons[ button ].label + '</button>';
    } );

    $( '.modal__buttons' ).append( buttonsHtml );
  }

  function _bindEvents() {
    modalWrapper.on( 'click.closeModal', function click( e ) {
      e.stopPropagation();
      if ( e.target === e.currentTarget ) {
        promise.reject( 'Modal closed' );
        _close();
      }
    } );

    body.on( 'keyup.closeModal', function keyup( evt ) {
      evt = evt || window.event;
      if ( evt.keyCode == 27 ) {
        promise.reject( 'Modal closed' );

        _close();
      }
    } );
  }

  function _unbindEvents() {
    modalWrapper.off( 'click.closeModal' );
    body.off( 'keyup.closeModal' );
  }

  function _close() {
    _unbindEvents( false );
    modalWrapper.html( '' );
    modalWrapper.removeClass( 'modal--show' );
  }
}

module.exports = ModalFactory()
