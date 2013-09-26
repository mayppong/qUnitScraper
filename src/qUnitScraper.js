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
            failedMessages["module " + moduleNumber] = this._readTest( thisModule );
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
    }
}