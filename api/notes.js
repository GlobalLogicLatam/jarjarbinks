let List = require( './list' ),
  notes = new Array();

class NotesController extends List {

  constructor() {
    super( notes );
  }

}

module.exports = NotesController;
