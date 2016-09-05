let pub_instance,
  topics = {},
  // eslint-disable-next-line no-unused-vars
  _id;

class Publisher {

  constructor() {
    topics = [];
  }

  publish( topic, args, success_cb, failure_cb ) {
    let topic_func_returns = [];

    if ( !topics[ topic ] ) {
      return false;
    }

    // Execute all functions and catch results.
    topics[ topic ].map( function get_funcs( item ) {
      topic_func_returns.push( item.func( args ) );
    } );

    // Execute publish callbacks to inform how and when it finished.
    Promise
      .all( topic_func_returns )
      .then( function success_handler( responses ) {
        success_cb( responses );
      } )
      .catch( function failure_handler( e ) {
        failure_cb( e );
      } );
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
