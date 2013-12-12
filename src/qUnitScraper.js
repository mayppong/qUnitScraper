/**
 * May Pongpitpitak
 * http://www.mayppong.com
 * qUnitScraper
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
     * It creates a new module with an array of test. It then calls _readTests method to 
     * get the information it needs about each test.
     * If the next test is from the same module as the previous test, it adds the test to same
     * module object instead.
     * Otherwise, it creates a new module object.
     * 
     * @params : (string) selector class name with the dot prefix, ".pass" or ".fail"
     * @return : (object) listing all the failed modules along with their information.
     */
    _readResults: function( type ) {
        var modules       = jQuery("[id^=qunit-test-output]");
        var moduleResults = [];
        
        var numModules    = modules.length;
        var lastNewModuleIndex = 0;
        for( var index=0; index < numModules; index++ ) {
            var thisModule     = modules[index];
            var thisModuleName = this._getModuleName( thisModule );

            if( jQuery(type, thisModule).length == 0 ) {
                continue;
            }
            else if( index > 0 && thisModuleName == moduleResults[lastNewModuleIndex]["name"] ) {
                moduleResults[ lastNewModuleIndex ][ "tests" ].push( this._readTests(thisModule, type) );
            }
            else {
                moduleResults.push( 
                    {
                        "name"   : thisModuleName,
                        "number" : this._getModuleNumber( jQuery(thisModule) ),
                        "tests"  : [ this._readTests( thisModule, type ) ]
                    }
                );
                lastNewModuleIndex = index;
            }
        }
        
        return moduleResults;
    },
    /**
     * This method takes jQuery object of the modules we want to read. It then searches 
     * for the assert list result based on the class type parameter passed (.pass or .fail).
     * The method puts together the list found, builds an object including the name, message and source
     * and returns it.
     * 
     * @params : module (object) jQuery object of the module we want to read
     *           type   (string) selector class name with the dot prefix, ".pass" or ".fail"
     * @return : (object) an object with 2 properties, name of test and another object listing the tests
     */
    _readTests: function( module, type ) {
        var tests   = jQuery(".qunit-assert-list " + type, module);

        var testResults = { 
            "name"       : jQuery(".test-name", module).html(),
            "assertions" : []
        };
        
        var numTests = tests.length;
        for( var index=0; index < numTests; index++ ) {
            var thisTest = tests[ index ];
            testResults["assertions"].push(
                {
                    "message": jQuery(".test-message", thisTest).html(),
                    "source" : jQuery(".test-source pre", thisTest).html()
                }
            );
        }
        
        return testResults;
    },
    /**
     * This one takes a jQuery object of the module we want to find the name of.
     * It looks for an element with a class name ".module-name" inside a parent module element
     * passed into the function.
     *
     * @params : (object) jQuery object of the module element
     * @return : (str) module name with colon-seperator appended or blank string
     */
    _getModuleName: function( module )
    {
        var moduleName = jQuery(".module-name", module).html();
        moduleName     = moduleName ? moduleName : "";
        return moduleName;
    },
    /**
     * This one takes a jQuery object of the module we want to find the number of.
     * Performs a regex match over the id of the DOM which includes an index at the very end.
     * Lastly, we add 1 to the number since the ID is 0-indexed vs the list display to user is 1-indexed.
     * 
     * @params : (object) jQuery object of the module element
     * @return : (int) module number as display to users
     */
    _getModuleNumber: function( module ) {
        var id    = module.attr( "id" );
        var match = id.match( /\d+$/ )[0];
        return parseInt( match ) + 1 ;
    }
}