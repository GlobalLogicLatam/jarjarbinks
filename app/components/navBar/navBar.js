/**
 * Created by gaston on 8/8/16.
 */
/**
 *
 * @constructor
 */
function NavBar(){

    let self = {},
        backButton;
    var back;

    back = noop;
    backButton = $('.jjb-navbar--back');
    backButton.click(onBack);

    return Object.assign(self, {
        addBack:addBack
    });

    /**
     * Add a promise that will execute before back last page
     * @param fn to add
     * @returns {Promise}
     */
    function addBack(fn){
        if(!$.isFunction(fn)){
            back = wrapPromiseInFunction(fn);
        }else{
            back = fn;
        }
        return back;
    }

    /**
     * Function for back button
     * @returns {Promise}
     */
    function onBack(){
        return back().then(function(){
            window.history.back();
        },handleError);
    }

    /**
     * Function without operation
     */
    function noop(){
        return Promise.resolve();
    }

    /**
     * Wrap a promise into a function
     * @param promise
     * @returns {Function}
     */
    function wrapPromiseInFunction(promise){
        return function wrapPromise(){
            return promise;
        }
    }

    /**
     * Error handler
     * @param error
     */
    function handleError(error){
       //TODO hadle the error
    }
}


module.exports = NavBar;