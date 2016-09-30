function noteCard() {

  $.fn.noteCard = function note_component( config ) {
    let self = this;
    init();

    return this;

    function init() {
      self.card( config );
    }
  };
}

module.exports = noteCard;
