let user = {},
  exist = false;

function User( user_data ){
  if ( !exist ){
    exist = true;
    user = JSON.parse( $.cookie( 'logged_user' ) );
  }

  return user;
}

module.exports = User;
