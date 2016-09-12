function serializeObject() {
  //Convert formdata to json
  $.fn.serializeObject = function serialize() {
    var json = {},
      array = this.serializeArray();
    array.forEach( function forEach( item ) {
      if ( json[ item.name ] !== undefined ) {
        if ( !json[ item.name ].push ) {
          json[ item.name ] = [ json[ item.name ] ];
        }
        json[ item.name ].push( item.value || '' );
      } else {
        json[ item.name ] = item.value || '';
      }
    } );
    return json;
  };
}
module.exports = serializeObject
