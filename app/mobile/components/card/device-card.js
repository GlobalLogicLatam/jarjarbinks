function deviceCard() {

  $.fn.deviceCard = function device_component( config ) {
    let self = this;
    init();

    return this;

    function init() {
      self.card( config );
    }
  };

}

module.exports = deviceCard;
