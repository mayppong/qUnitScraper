test( "Parser returns correct data", function() {
  var sample, expected;

  stop(2);
  jQuery.get("sample.html", function(data) {
    sample = data;
    start();
  });
  jQuery.get("sample.JSON", function(data) {
    expected = data;
    start();
  });

  equal( JSON.stringify(qUnitScraper.parse(sample)), JSON.stringify(expected), "parsed data correctly." );
});