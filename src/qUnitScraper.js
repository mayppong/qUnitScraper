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
        
        var results = {
            "pass" : this._readResults(".pass"),
            "fail" : this._readResults(".fail")
        };
        return( results );
    },
    /**
     * _readResults first creates a jQuery object, selecting output listing. 
     * It then calls _readModule method to get the information it needs about each module and returns an object
     * listing each method indexed by the method number as displayed to user.
     * 
     * @params : (string) selector class name with the dot prefix, it should be either ".pass" or ".fail"
     * @return : (object) listing all the failed modules along with their information.
     */
    _readResults: function( type ) {
        var modules = jQuery("[id^=qunit-test-output]");
        var moduleResults = {};
        
        var numModules = modules.length;
        for( var moduleNumber=0; moduleNumber < numModules; moduleNumber++ ) {
            var thisModule = modules[moduleNumber];
            if( jQuery(type, thisModule).length == 0 ) {
                continue;
            }
            else {
                moduleResults["module " + this._getModuleNumber(jQuery(thisModule))] = this._readModule( thisModule, type );
            }
        }
        
        return moduleResults;
    },
    /**
     * This method takes jQuery object of the modules we want to read. 
     * It then searches for the assert list result based on the class type parameter passed (.pass or .fail).
     * The method puts together the list found, builds an object including the name, message and source
     * and returns it.
     * 
     * @params : module (object) jQuery object of the module we want to read
     *           type   (string) selector class name with the dot prefix, it should be either ".pass" or ".fail"
     * @return : (object) an object with 2 properties, name of test and another object listing the tests
     */
    _readModule: function( module, type ) {
        var tests   = jQuery(".qunit-assert-list " + type, module);
        var testResults = {
            "name" : jQuery(".module-name", module).html() + ": " + jQuery(".test-name", module).html(),
            "tests": []
        };
        
        var numTests = tests.length;
        for( var testNumber=0; testNumber < numTests; testNumber++ ) {
            var thisTest = tests[testNumber];
            testResults["tests"].push({
                "message": jQuery(".test-message", thisTest).html(),
                "source" : jQuery(".test-source pre", thisTest).html()
            });
        }
        
        return testResults;
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