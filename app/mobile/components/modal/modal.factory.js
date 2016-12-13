let require_factory = require( 'modules/require-factory' );

function ModalFactory() {
  let self = {},
    modalWrapper,
    promise = {},
    body = $( 'body' );

    //Public methods and attributes
  Object.assign( self, {
    alert: alert,
    confirm: confirm,
    custom: custom
  } );

  _init();

  return self;

  /*
    PUBLIC FUNCTIONS
  */

  function alert( params ) {
    var config = {
      content: {
        title: params.title || '',
        message: params.message,
        buttons: {
          accept: {
            classes: 'btn btn--primary',
            label: 'Aceptar',
            callback: _close,
            selector: 'js-modal__accept-button'
          }
        }
      }
    };

    return self.custom( config );
  }

  // function confirm( params ) {
  //   params.buttons = params.buttons || {
  //     accept: {
  //       classes: 'btn btn--primary btn--small',
  //       label: 'Aceptar',
  //       callback: close,
  //       selector: 'js-modal__accept'
  //     },
  //     cancel: {
  //       classes: 'btn btn--primary btn--small',
  //       label: 'Cancelar',
  //       callback: close,
  //       selector: 'js-modal__cancel'
  //     }
  //   }
  //   return self.custom( params );
  // }

  /**
   * params: templateUrl, templateHtml, content, buttons
   */
  function custom( params ) {
    var tmpl,
      rendered_tmpl,
      defaultTemplateUrl = 'components/modal/modal.template.mustache',
      config = Object.assign( {
        content: {
          buttons: {}
        }
      }, params );

    // Set template.
    tmpl = config.templateHtml || require_factory( defaultTemplateUrl );

    // Fill template with content.
    rendered_tmpl = Mustache.render( tmpl, config.content || {} );

    // Insert modal content into view.
    modalWrapper.html( rendered_tmpl );

    // Bind closing events
    _bindCloseEvents();

    // Show modal.
    modalWrapper.addClass( 'modal--show' );

    if ( config.content.buttons.accept ) {
      $( `.${config.content.buttons.accept.selector}` )
        .on( 'click', function clickAccept() {
          config.content.buttons.accept.callback && config.content.buttons.accept.callback();
          promise.resolve();
        } );
    }

    return new Promise( function modalPromise( resolve, reject ) {
      promise.resolve = resolve;
      promise.reject = reject;
    } );
  }


  /*
    PRIVATE FUNCTIONS
  */

  function _init() {
    if ( !modalWrapper ) {
      modalWrapper = $( '<div id="modal-wrapper" class="modal-wrapper"></div>' );
      body.append( modalWrapper );
    }
  }

  function _bindCloseEvents() {
    // Close modal clicking on backdrop.
    modalWrapper.on( 'click.closeModal', function click( e ) {
      e.stopPropagation();
      if ( e.target === e.currentTarget ) {
        promise.reject( 'Modal closed' );
        _close();
      }
    } );

    // Close modal pressing Escape key.
    body.on( 'keyup.closeModal', function keyup( e ) {
      e = e || window.event;
      if ( e.keyCode == 27 ) {
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
    _unbindEvents();
    modalWrapper.removeClass( 'modal--show' );
    modalWrapper.html( '' );
  }
}

module.exports = ModalFactory();
