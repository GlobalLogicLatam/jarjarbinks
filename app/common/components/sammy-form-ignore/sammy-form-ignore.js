function formIgnore() {
  $( function remove_sammy_intervention() {
    Sammy = Sammy || {};
    Sammy.RegularFormSubmitFix = function formSubmitFix( app ) {
      app.defaultCheckFormSubmission = this._checkFormSubmission;
      app._checkFormSubmission = function formSubmission( form ) {
        var path,
          verb;
        path = form.action;
        verb = form.method.toLowerCase();
        if ( verb === 'get' && !path.startsWith( '#' ) ) {
          return false;
        } else {
          return this.defaultCheckFormSubmission( form );
        }
      };
    }
  } );
}
module.exports = formIgnore();
