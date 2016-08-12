/**
 * Created by gaston on 8/8/16.
 */
/**
 *
 * @constructor
 */
function NavBar() {
  var self = this;
  window.NavBar = window.NavBar || init();

  return window.NavBar;

  /**
   * Init navbar
   * @returns {NavBar}
   */
  function init() {
    let navObj = {};

    /*self.back = noop;
    self.ignoreUrls = [];
    self.hideOnUrls = [];*/
    self.nav = $( '.jjb-navbar' );
    self.backButton = $( '.jjb-navbar--back' );
    self.backButton.click( onBack );
    self.actionsButtons = $( '.jjb-navbar--action-buttons' );

    /*window.addEventListener( 'hashchange', function handleHashChange() {
      resetNavBar();
    } );*/

    return Object.assign( navObj, {
      addBackAction: addBackAction,
      setTitle: setTitle,
      hide: hide,
      show: show,
      addActionButton:addActions,
      open:open
    } );
  }

  /**
   * Init NavBar
   * @param options
   */
  function open( options ){
    resetNavBar();

    if( options ) {
      setTitle(options.title || '');
      addBackAction(options.backActions || noop);
      addActions(options.actionButtons || [] );
    }

    show();
  }

  /**
   * Add an action button to nav bar
   * @param actions
   */
  function addActions( actions ){
    if( Array.isArray( actions ) ){
      actions.forEach( addActionButton );
    }else{
      addActionButton( actions );
    }
  }

  /**
   * Add an action button to nav bar
   * @param actionButton
   */
  function addActionButton( actionButton ){
    let button = createButton( actionButton );
    self.actionsButtons.append( button );
  }

  /**
   * Create a new action button
   * @param actionButton
   * @returns {*|jQuery|HTMLElement}
   */
  function createButton( actionButton ){
    let li, a, span;
    li = $( document.createElement( 'li' ) );
    a =  $( document.createElement( 'a' ) );
    span = $( document.createElement( 'span' ) );
    span.addClass( 'glyphicon ' + actionButton.icon );
    a.append( span );
    a.attr( "href", '#' );
    a.click( actionButton.action );
    li.append( a );
    return li;
  }

  /**
   * @deprecated
   * Add Urls to hide the nav bar
   * @param urls as string or as array of strings
   */
  /*function hideOn( urls ) {
    if ( Array.isArray( urls ) ) {
      self.hideOnUrls = self.hideOnUrls.concat( urls );
    } else {
      self.hideOnUrls.push( urls );
    }
    checkUrl();
  }*/

  /**
   * Hide NavBar
   */
  function hide() {
    self.nav.hide();
  }

  /**
   * Show NavBar
   */
  function show() {
    self.nav.show();
  }

  /**
   * @deprecated
   * Add Urls to hide the back button
   * @param urls as string or as array of strings
   */
  /*function ignoreBackButton( urls ) {
    if ( Array.isArray( urls ) ) {
      self.ignoreUrls = self.ignoreUrls.concat( urls );
    } else {
      self.ignoreUrls.push( urls );
    }
    checkUrl();
  }*/

  /**
   * Set the title on the navbar
   * @param title
   */
  function setTitle( title ) {
    $( '.jjb-navbar--title' ).html( title );
  }

  /**
   * @deprecated
   * Check the urls where we don't add the back button
   */
  /*function checkUrl() {
    if ( self.ignoreUrls.find( url => url === window.location.hash ) ) {
      self.backButton.children().addClass( 'hidden' );
      self.backButton.prop( 'disabled', true );
    } else {
      self.backButton.children().removeClass( 'hidden' );
      self.backButton.prop( 'disabled', false );
    }

    if ( self.hideOnUrls.find( url => url === window.location.hash ) ) {
      hide();
    } else {
      show();
    }
  }*/

  /**
   * Add a promise that will execute before back last page
   * @param fn or promise to add
   * @returns {Promise}
   */
  function addBackAction( fn ) {
    if ( !$.isFunction( fn ) ) {
      self.back = wrapPromiseInFunction( fn );
    } else {
      self.back = fn;
    }
    return self.back;
  }

  /**
   * Function for back button
   * @returns {Promise}
   */
  function onBack() {
    return self.back().then( function backPage() {
      window.history.back();
    }, handleError ).then( resetNavBar );
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
    self.back = noop;
    self.actionsButtons.empty();
    self.backButton.children().addClass( 'hidden' );
    self.backButton.prop( 'disabled', true );
  }

  /**
   * Error handler
   * @param error
   */
  function handleError() {
    //TODO hadle the error
  }
}

module.exports = NavBar;
