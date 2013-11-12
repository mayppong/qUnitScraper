## FEATURES

The qUnitScraper object can be run over a qUnit result page to scrape the information into a single JSON object for exporting/processing. I created this object specifically so it can be passed back to Selenium.

The way it works is that it looks for ".pass" or ".fail" class that qUnit adds to container elements when it displays the results. The catcha is that an entire module is marked as failed if just one test fails. That means if a module of 3 tests has 1 failed test, this module would show up in qUnitScraper's returned JSON object in both "pass" and "fail".

The JSON object returns by qUnitScraper has the following format
<pre>{
	"pass": {
		"module #" : {
			"name" : "...",
			"tests": [
				{
					"message" : "...",
					"source"  : "..."
				},
				{
					"message" : "...",
					"source"  : "..."
				}
			]
		}
	},
	"fail": { ... }
}</pre>


To-Do: 
[x] collect and return failed modules  
[x] add flag for selecting success or fail


## ABOUT

Author:  May Pongpitpitak
Website: http://www.mayppong.com


## LICENSE

The MIT License (MIT)

Copyright (c) 2013 May Pongpitpitak

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

