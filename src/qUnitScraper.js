/**
 * qUnitScraper object
 */
var qUnitScraper = {
    /**
     * Start here!
     * This is the first method to invoke to call other method. 
     * Currently it can only does the call to other methods and doesn't do any processing here. 
     * It then should return all the failed modules in object format back to caller.
     *
     * @params : none
     * @return : (object) the object listing all the failed modules along with their information
     */
    init: function() {
        // validate page here
        
        var failedMessages = this._readResults();
        return( failedMessages );
    },
    /**
     * _readResults create a jQuery object, selecting output listing. 
     * Currently it's looking only for the failed modules, but could be 
     * extended to specify which to look for.
     * It calls other methods to get the information it needs and returns an object
     * listing each method indexed by the method number as displayed to user.
     * 
     * @params : none
     * @return : (object) listing all the failed modules along with their information.
     */
    _readResults: function( ) {
        var failedModules = jQuery("#qunit-tests .fail[id^=qunit-test-output]");
        var failedMessages = [];
        
        var numFailedModules = failedModules.length;
        for( var moduleNumber=0; moduleNumber < numFailedModules; moduleNumber++ )
        {
            var thisModule = failedModules[moduleNumber];
            failedMessages["module " + this._getModuleNumber(jQuery(thisModule))] = this._readModule( thisModule );
        }
        
        return failedMessages;
    },
    /**
     * This method takes jQuery object of the modules we want to read. 
     * It then searches for the assert list result, currently the failed ones.
     * Like _readResults, it could be extended.
     * The method puts together the list found, builds an object including the name, message and source
     * and returns it.
     * 
     * @params : (object) jQuery object of the module we want to read
     * @return : (object) an object with 2 properties, name of test and another object listing the tests
     */
    _readModule: function( failedModule ) {
        var failedTests   = jQuery(".qunit-assert-list .fail", failedModule);
        var failedMessages = {
            "name" : jQuery(".module-name", failedModule).html() + ": " + jQuery(".test-name", failedModule).html(),
            "tests": []
        };
        
        var numFailedTests = failedTests.length;
        for( var testNumber=0; testNumber < numFailedTests; testNumber++ ) {
            var thisTest = failedTests[testNumber];
            failedMessages["tests"].push({
                "message": jQuery(".test-message", thisTest).html(),
                "source" : jQuery(".test-source pre", thisTest).html()
            });
        }
        
        return failedMessages;
    },
    /**
     * This one takes a jQuery object of the module we want to find the number.
     * Performs a regex match over the id of the DOM which includes an index at the very end.
     * Lastly, we add 1 to the number since the ID is 0-indexed vs the list display to user is 1-indexed.
     * 
     * @params : (object) jQuery object of the module element
     * @return : (int) module number as display to users
     */
    _getModuleNumber: function( module ) {
        var id = module.attr( "id" );
        var match = id.match( /\d+$/ )[0];
        return parseInt( match ) + 1 ;
    }
}