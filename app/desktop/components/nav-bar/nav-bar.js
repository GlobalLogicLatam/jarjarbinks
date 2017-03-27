let require_factory = require( 'modules/require-factory' ),
  tmpl = require_factory( 'components/nav-bar/nav-bar.template.mustache' );

function Nav_Bar() {
  init();

  function init() {
    let user = require_factory( 'modules/user' )(),
      nav_el = $( '.js-navbar-holder' ),
      // Rendered menu template
      rendered_html = $( Mustache.render( tmpl ) );

    rendered_html
      .find( '.js-avatar' )
      .attr( 'src', user.profileAvatar );

    // Replaced menu container with menu.
    nav_el.replaceWith( rendered_html );
  }
}

module.exports = Nav_Bar;
