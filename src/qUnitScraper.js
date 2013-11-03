var qUnitScraper = {
    init: function() {
        // validate page here
        
        var failedMessages = this._readModule();
        console.log( failedMessages );
    },
    _readModule: function( ) {
        var failedModules = jQuery("#qunit-tests .fail[id^=qunit-test-output]");
        var failedMessages = [];
        
        var numFailedModules = failedModules.length;
        for( var moduleNumber=0; moduleNumber < numFailedModules; moduleNumber++ )
        {
            var thisModule = failedModules[moduleNumber];
            failedMessages["module " + this._getModuleNumber(jQuery(thisModule))] = this._readTest( thisModule );
        }
        
        return failedMessages;
    },
    _readTest: function( failedModule ) {
        var failedTests   = jQuery(".qunit-assert-list .fail", failedModule);
        var failedMessages = [];

        failedMessages["name"] = jQuery(".module-name", failedModule).html() + ": " + jQuery(".test-name", failedModule).html();
        
        var numFailedTests = failedTests.length;
        for( var testNumber=0; testNumber < numFailedTests; testNumber++ )
        {
            var thisTest = failedTests[testNumber];
            failedMessages["test " + testNumber] = [];
            failedMessages["test " + testNumber]["message"] = jQuery(".test-message", thisTest).html();
            failedMessages["test " + testNumber]["source"]  = jQuery(".test-source pre", thisTest).html();
        }
        
        return failedMessages;
    },
    /**
     * This one take a jQuery object of the module we want to find the number.
     * Performs a regex match over the id of the DOM which includes an index at the very end.
     * Lastly, we add 1 to the number since the ID is 0-indexed vs the list display to user is 1-indexed.
     * 
     * @params : (object) jQuery object of the module element
     * @return : (int) module number as display to users
     */
    _getModuleNumber: function(module) {
        var id = module.attr("id");
        var match = id.match(/\d+$/)[0];
        return parseInt( match ) + 1 ;
    }
}