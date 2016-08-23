class List {

  constructor( list ) {
    this.list = list;
  }

  get( req, res, next ) {
    let res_value,
      _id;

    if ( _id = hasId( req.urlParams ) ) {
      res_value = find_item( this.list, _id ).value;
    } else {
      res_value = this.list;
    }

    if ( res_value === undefined ) {
      res.writeHead( 404, { 'Content-Type': 'application/json' } );
    } else {
      res.writeHead( 200, { 'Content-Type': 'application/json' } );
    }

    res.end( JSON.stringify( res_value ) );
  }

  post( req, res, next ) {
    let data = req.body;

    data._id = this.list.length + 1;
    this.list.push(data);

    res.writeHead( 200, { 'Content-Type': 'application/json' } );
    res.end( JSON.stringify( data ) );
  }

  put( req, res, next ) {
    let data = req.body,
      _id,
      item,
      res_value;

    if ( _id = hasId( req.urlParams ) ) {
      item = find_item( this.list, _id );
      Object.assign(item.value, data);
      console.log('item: ', item);
      res_value = this.list[ item.key ];

      res.writeHead( 200, { 'Content-Type': 'application/json' } );
    } else {
      res_value = {};
      res.writeHead( 404, { 'Content-Type': 'application/json' } );
    }

    res.end( JSON.stringify( res_value ) );
  }

  delete( req, res, next ) {
    let res_value,
      _id,
      array_item;

    _id = hasId( req.urlParams );

    if ( _id ) {
      array_item = find_item( this.list, _id );
      this.list.splice( array_item.key, 1 );
      res_value = array_item.value;

    } else {
      this.list.splice( 0 );
      res_value = this.list;
    }

    if ( res_value === undefined ) {
      res.writeHead( 404, { 'Content-Type': 'application/json' } );
    } else {
      res.writeHead( 200, { 'Content-Type': 'application/json' } );
    }

    res.end( JSON.stringify( res_value ) );
  }

}

// PRIVATE FUNCTIONS

// Evaluates if first param is a number. Url should be like http//:host/controllerName/:id
function hasId( urlParams ) {
  let n =  Number.parseInt( urlParams[ 0 ] );

  if ( Number.isInteger( n ) ) {
    return n;
  } else {
    return false;
  }
}

function find_item( list, _id ) {
  let wanted_item;

  list.forEach(
    function find_item( item, key ) {
      if ( item._id == _id ) {
        wanted_item = {
          key: key,
          value: item
        };
      }
    }
  );

  return wanted_item;
}

module.exports = List;
