function longClick() {

  jQuery.event.special.longclick = {
    delegateType: 'mousedown',
    bindType: 'mousedown',
    handle: function eventHandler( event ) {
      let handleObj = event.handleObj,
        config = {},
        timeout_id;

      // Overwrite default with custom configurations.
      Object.assign( config, {
        time: 0
      }, event.data );

      // Run event handler when time is out.
      timeout_id = setTimeout( function run_custom_handler() {
        handleObj.handler.apply( event.delegateTarget, event );
      }, config.time );

      // Release timeout
      this.addEventListener( 'mouseup', function mouseup_handler() {
        clearTimeout( timeout_id );
      } );
    }
  }

}

module.exports = longClick
