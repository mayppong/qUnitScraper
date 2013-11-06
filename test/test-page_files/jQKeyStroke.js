
function jQKeyStroke(event) {

	var keyData = {
		eventType	: event.type,
		keyCode		: event.which,
		altKey		: event.altKey || false,
		ctrlKey		: event.ctrlKey || false,
		shiftKey	: event.shiftKey || false,
		character	: "",
		keyType		: null
	};
	
	// Process keydown event.
	// Pressing CTRL+ or ALT+ combination will causes the key to fire only on keydown and NOT keypress
	if( keyData.eventType === "keydown" )
	{
		// Logic
		var bNoModifierKey = !keyData.ctrlKey && !keyData.altKey;
		var bModifierKey   =  keyData.ctrlKey ||  keyData.altKey;
		var bIsCharKey 	  = 
			( 48 <= keyData.keyCode && keyData.keyCode <=  90) ||
			( 96 <= keyData.keyCode && keyData.keyCode <= 111) ||
			(186 <= keyData.keyCode && keyData.keyCode <= 222);
		var ignoreKeyList = [ 16, 17, 18 ]; 		// ALT, CTRL and SHIFT
		
		// End function if ignored key or normal character key is pressed to move on to keypress event
		var bSkipKeyDown = (ignoreKeyList.indexOf(keyData.keyCode) > -1) || (bNoModifierKey && bIsCharKey);
		if( bSkipKeyDown ) { return; }
		
		
		if( bNoModifierKey ) {
			if( keyData.keyCode <= 46 )
			{
				keyData.keyType = "COMMAND_KEY";
			}
			else if( 112 <= keyData.keyCode && keyData.keyCode <= 123 )
			{
				keyData.keyType = "FUNCTION_KEY";
			}
		}
		else if( bModifierKey ) {
			keyData.keyType = "MODIFIED_KEY";
		}
		
		// Stop keypress from happening and start processing keys
		//event.preventDefault();
	}
	// Processs keypress event.
	else if( keyData.eventType === "keypress" )
	{
		keyData.character = String.fromCharCode( keyData.keyCode ); 
		keyData.keyType   = "CHARACTER_KEY";
	}

	jQuery("body").data("keyData", keyData);
	jQuery(document).trigger("keystroke", keyData);
}


jQuery( function() {
	jQuery("body").on("keydown", jQKeyStroke ).on("keypress", jQKeyStroke );
});
