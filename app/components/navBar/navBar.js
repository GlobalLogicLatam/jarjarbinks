/**
 * Created by gaston on 8/8/16.
 */

/* TODO agregar $.fn
  Promise.all
 */

var navInst = undefined;
/**
 *
 * @constructor
 */

//eslint-disable-next-line
module.exports = (navInst ? navInst : navInst = NavBar());


/**
 * Init navbar
 * @returns {NavBar}
 */
function NavBar() {
  let self = this;
  var config;

  Object.assign(self,{
    addBackAction: addBackAction,
    addOptionsButton: addOptionsButton,
    setTitle: setTitle,
    hide: hide,
    show: show,
    addActionButton: addActions,
    open: open,
    reset: resetNavBar
  });

  init();
  return self;

  function init() {

    let navEle = $( '.jjb-navbar' );

    config = {
      nav: navEle,
      backButton: navEle.find( '.jjb-navbar__back' ),
      actionsButtons: navEle.find( '.jjb-navbar__action-buttons' ),
      actionsOptions: null
    };

    config.backButton.click( onBack );
    hide();
  }

  /**
   * Init NavBar
   * @param options
   */
  function open( options ) {
    resetNavBar();
    if ( options && options.title ) {
      setTitle( options.title );
    }
    if ( options && options.backActions ) {
      addBackAction( options.backActions );
    }
    if ( options && options.actionButtons ) {
      addActions( options.actionButtons );
    }
    show();
  }

  function addOptionsButton( fn ) {

  }

  /**
   * Add an action button to nav bar
   * @param actions
   */
  function addActions( actions ) {
    if ( Array.isArray( actions ) ) {
      actions.forEach( addActionButton );
    } else {
      addActionButton( actions );
    }
  }

  /**
   * Add an action button to nav bar
   * @param actionButton
   */
  function addActionButton( actionButton ) {
    let li = $( document.createElement( 'li' )),
      button = createButton( actionButton );
    li.append( button );
    config.actionsButtons.append( li );
  }

  /**
   * Create a new action button
   * @param actionButton
   * @returns {*|jQuery|HTMLElement}
   */
  function createButton( actionButton ) {
    let a = $( document.createElement( 'a' ) ),
      span = $( document.createElement( 'span' ) );
    span.addClass( 'glyphicon ' + actionButton.icon );
    a.append( span );
    a.attr( 'href', '#' );
    a.click( actionButton.action );
    return a;
  }

  /**
   * Hide NavBar
   */
  function hide() {
    config.nav.addClass( 'hidden' );
  }

  /**
   * Show NavBar
   */
  function show() {
    config.nav.removeClass( 'hidden' );
    if( config.optionsButton ){
      showBackButton();
    } else {
      hideBackButton();
    }
  }

  /**
   * Set the title on the navbar
   * @param title
   */
  function setTitle( title ) {
    $( '.jjb-navbar__title' ).html( title );
  }

  /**
   * Add a promise that will execute before back last page
   * @param fn or promise to add
   * @returns {Promise}
   */
  function addBackAction( fn ) {
    if ( !$.isFunction( fn ) ) {
      config.back = wrapPromiseInFunction( fn );
    } else {
      config.back = fn;
    }
    return config.back;
  }

  /**
   * Function for back button
   * @returns {Promise}
   */
  function onBack() {
    return config.back().then( function backPage() {
      window.history.back();
    } ).then( resetNavBar );
  }

  /**
   * Function without operation
   */
  function noop() {
    return Promise.resolve();
  }

  /**
   * Wrap a promise into a function
   * @param promise
   * @returns {Function}
   */
  function wrapPromiseInFunction( promise ) {
    return function wrapPromise() {
      return promise;
    }
  }

  /**
   * Reset nav bar to clean added promises and actions buttons
   */
  function resetNavBar() {
    hide();
    config.back = noop;
    config.actionsButtons.empty();
    hideBackButton();
  }

  function hideBackButton() {
    config.backButton.children().addClass( 'hidden' );
    config.backButton.prop( 'disabled', true );
  }

  function showBackButton() {
    config.backButton.children().removeClass( 'hidden' );
    config.backButton.prop( 'disabled', false );
  }
}

