function noteCard() {

    $.fn.noteCard = function(config) {
        //this = $(".js-card")
        let self = this;
        init();

        return this;

        function init() {
            self.card(config);
        }
  };

}

module.exports = noteCard