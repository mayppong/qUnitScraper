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
     * @params : page     the html document containing the qunit result 
     * @return : (object) the object listing all the failed modules along with their information
     */
    parse: function( page ) {
        // validate page here
        
        var results = {
            "pass" : this._readResults(".pass", page),
            "fail" : this._readResults(".fail", page)
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
    _readResults: function( type, scope ) {
        var tests = jQuery("[id^=qunit-test-output]", scope);
        var moduleResults = [];
        
        var numTests = tests.length;

        for( var index=0; index < numTests; index++ ) {
            var thisTest = tests[index];

            if( jQuery(type, thisTest).length != 0 ) {
                var thisModuleName = this._getModuleName( thisTest );
                var previousModule = moduleResults[moduleResults.length - 1];

                if( previousModule && thisModuleName == previousModule["name"] ) {
                    previousModule["tests"].push( this._readTests(thisTest, type) );
                }
                else {
                    moduleResults.push({
                        "name"  : thisModuleName,
                        "tests" : [ this._readTests( thisTest, type ) ]
                    });
                }
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
            "number"     : this._getTestNumber( module ),
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
    _getTestNumber: function( module ) {
        var module = jQuery(module);
        var id    = module.attr( "id" );
        var match = id.match( /\d+$/ )[0];
        return parseInt( match ) + 1 ;
    }
}