let pub_instance,
  topics = {},
  // eslint-disable-next-line no-unused-vars
  _id;

class Publisher {

  constructor() {
    topics = [];
  }

  publish( topic, args ) {
    if ( !topics[ topic ] ) {
      return false;
    }

    topics[ topic ].map( function execute_func( item ) {
      item.func.call( null, args )
    } );

    return true;
  }

  subscribe( topic, func ) {
    if ( !topics[ topic ] ) {
      topics[ topic ] = [];
    }

    let _id = ( Math.random() + Date.now() ) * 10000;
    topics[ topic ].push( {
      _id: _id,
      func: func
    } );

    return _id;
  }

  unsubscribe( _id ) {
    let topic_name;

    for ( topic_name in topics ) {
      topics[ topic_name ].forEach( function subscribed_items_by_topic( subscribed_items, key ) {
        let sub_item = topics[ topic_name ][ key ];

        if ( sub_item._id == _id ) {
          topics[ topic_name ].splice( key, 1 )
        }
      } );
    }
  }
}

pub_instance = pub_instance || new Publisher();

module.exports = pub_instance;
