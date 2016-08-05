function formIgnore(){
  $(function($) { 
    Sammy = Sammy || {}; 
    Sammy.RegularFormSubmitFix = function(app) { 
      app.defaultCheckFormSubmission = this._checkFormSubmission; 
      app._checkFormSubmission = function (form) { 
        var path, verb; 
        path = form.action; 
        verb = form.method.toLowerCase();
        if (verb === "get" && !path.startsWith("#")){ 
          return false; 
        } 
        else { 
          return this.defaultCheckFormSubmission(form); 
        } 
      }; 
    } 
  }); 
}
module.exports = formIgnore