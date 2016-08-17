/**
 * Created by gaston on 8/8/16.
 */

/* TODO agregar $.fn
  Promise.all
  singleton para el navbar
  Sammy.before
 */

var navInst = undefined;
/**
 *
 * @constructor
 */
function NavBar() {
  if ( !navInst ) {
    navInst = init();
  }
  return navInst.fns;
}

module.exports = NavBar;


/**
 * Init navbar
 * @returns {NavBar}
 */
function init() {
  navInst = {
    nav: $( '.jjb-navbar' ),
    backButton: $( '.jjb-navbar__back' ),
    actionsButtons: $( '.jjb-navbar__action-buttons' ),
    fns: {
      addBackAction: addBackAction,
      setTitle: setTitle,
      hide: hide,
      show: show,
      addActionButton: addActions,
      open: open,
      reset: resetNavBar
    }
  };
  navInst.backButton.click( onBack );
  hide();
  return navInst;
}
/**
 * Init NavBar
 * @param options
 */
function open( options ) {
  resetNavBar();

  if ( options ) {
    setTitle( options.title || '' );
    addBackAction( options.backActions || noop );
    addActions( options.actionButtons || [] );
  }

  show();
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
  let button = createButton( actionButton );
  navInst.actionsButtons.append( button );
}

/**
 * Create a new action button
 * @param actionButton
 * @returns {*|jQuery|HTMLElement}
 */
function createButton( actionButton ) {
  let li = $( document.createElement( 'li' ) ),
    a = $( document.createElement( 'a' ) ),
    span = $( document.createElement( 'span' ) );
  span.addClass( 'glyphicon ' + actionButton.icon );
  a.append( span );
  a.attr( 'href', '#' );
  a.click( actionButton.action );
  li.append( a );
  return li;
}

/**
 * Hide NavBar
 */
function hide() {
  navInst.nav.addClass( 'hidden' );
}

/**
 * Show NavBar
 */
function show() {
  navInst.nav.removeClass( 'hidden' );
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
    navInst.back = wrapPromiseInFunction( fn );
  } else {
    navInst.back = fn;
  }
  showBackButton();
  return navInst.back;
}

/**
 * Function for back button
 * @returns {Promise}
 */
function onBack() {
  return navInst.back().then( function backPage() {
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
  navInst.back = noop;
  navInst.actionsButtons.empty();
  hideBackButton();
}

function hideBackButton() {
  navInst.backButton.children().addClass( 'hidden' );
  navInst.backButton.prop( 'disabled', true );
}

function showBackButton() {
  navInst.backButton.children().removeClass( 'hidden' );
  navInst.backButton.prop( 'disabled', false );
}
