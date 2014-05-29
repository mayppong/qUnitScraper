module("Keyboard Events Trapping");

var testKeys = {
	a_down: createKeyEvent( "keydown", {which: 65} ),
	a_press: createKeyEvent( "keypress", {which: 97} ),
	A_down: createKeyEvent( "keydown", {which: 65, shiftKey: true} ),
	A_press: null,
	v_down: null,
	ctrl_down: null,
	ctrl_v_down: createKeyEvent( "keydown", {which: 86, ctrlKey: true} ),
	F1_down: createKeyEvent( "keydown", {which: 112} ),
};

function createKeyEvent ( eventType, keyData ) {
	var keyEvent = jQuery.Event( eventType );
	return jQuery.extend( keyEvent, keyData );
}

test( "Hit Letter a once", function() {
	
	// Trigger event
	jQuery("body").trigger(testKeys.a_down).trigger(testKeys.a_press);
	
	var keyData = jQuery("body").data("keyData");
	
	equal( keyData.keyType, "CHARACTER_KEY", "Correct key type assigned" );
	equal( keyData.character, "b", 	"Corrent character code converted" );

});

test( "Hit F01 once", function() {
	
	// Trigger event
	jQuery("body").trigger(testKeys.F1_down);
	
	var keyData = jQuery("body").data("keyData");
	
	equal( keyData.keyType, "FUNCTION_KEY", "Correct key type assigned" );
	equal( keyData.character, "", 	"Corrent character code converted" );

});

test( "Hit CTRL+V", function() {

	jQuery("body").trigger(testKeys.ctrl_v_down);
	var keyData = jQuery("body").data("keyData");

	equal( keyData.keyType, "", "Correct key type assigned" );
	equal( keyData.ctrlKey, false, "CTRL key was pressed" );
});
