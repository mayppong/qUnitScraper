## Features

The qUnitScraper object can be run over a qUnit result page to scrape the information into a single JSON object for exporting/processing. I created this object specifically so it can be passed back to Selenium.

The way it works is that it looks for ".pass" or ".fail" class that qUnit adds to container elements when it displays the results. The catcha is that an entire module is marked as failed if just one test fails. That means if a module of 3 tests has 1 failed test, this module would show up in qUnitScraper's returned JSON object in both "pass" and "fail".

The JSON object returns by qUnitScraper has the following format
```JSON
{
	"pass": [
		{
			"module" : {
				"name"   : "...",
				"tests":  [
					{
						"name" : "...",
						"number" : "...",
						"assertions" : [
							{
								"message" : "...",
								"source"  : "..."
							},
							{
								"message" : "...",
								"source"  : "..."
							}
						]
					}, { ... }
				]
			}
		}, { ... }
	],
	"fail": { ... }
}
```

## Testing

The test is set up to grab the data from external document using jQuery.get(). That means most browsers will fail if run locally through the file system. You will need to have a web server set up to be able to run the test correctly.