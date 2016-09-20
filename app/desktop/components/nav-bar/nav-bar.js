let require_factory = require( 'modules/require-factory' ),
  tmpl = require_factory( 'components/nav-bar/nav-bar.template.mustache' );

function Nav_Bar() {
  init();

  function init() {
    let nav_el = $( '.js-nav-bar' ),
      // Rendered menu template
      rendered_html = $( Mustache.render( tmpl ) );

    // Replaced menu container with menu.
    nav_el.replaceWith( rendered_html );
  }
}

module.exports = Nav_Bar;
