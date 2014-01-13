# Origami user agent <small>*o-useragent*</small>

This module provides sass variables for classes used to target particular user agents.

## Installation

To include `o-useragent` in your module or product run

	bower install o-useragent=http://git.svc.ft.com:9080/git/origami/o-useragent.git --save

## Usage

Add the following to the top of your SASS stylesheet

	@import "o-useragent/main";  

For a complete list of supported useragents and the default values of the classes that target them see [main.scss](http://git.svc.ft.com/blob/origami%2Fo-useragent.git/HEAD/_variables.scss).

To target styles at a given user agent use the `oUseragentTarget()` mixin, e.g.

	@include oUseragentTarget(ie8 ie7) {
		.sel {
			//styles
		}
	}

### Polyfills
This module contains a polyfill for Internet Explorer 7's lack of support for css `box-sizing`. e.g.

    .column {
		box-sizing: border-box;
		@include oUseragentIe7BoxSizing();
    }

###Product development
How the classes are added to the html of a product is left up to the product developer.

To override the default class name values (e.g. if your product already uses the class `lt-ie8`) redefine the variables *before* importing the main stylesheet

	$o-useragent-ie7: '.lt-ie8';
	$o-useragent-ltie8: '.lt-ie8';
	@import "o-useragent/main";

To deprecate support for a given browser use the `oUseragentDeprecate()` mixin, e.g.

	@include oUseragentDeprecate(ie7) {
		.sel {
			//styles
		}
	}

## Adding a new user agent

To extend this module to target additional user agents you will need to 

1. Give the useragent you're targeting a sensible abbreviated name, including the version number (separated with underscores or hyphens, not dotted) only if you are certain you only need to target that particular version: e.g. opera-mobile, android-2-2	
2. Add a new useragent class variable to `_variables.scss` e.g `$o-useragent-android-2-2: '.o-useragent-android-2-2' !default; 
3. In `_mixins.scss` add new rules to `oUseragentTarget ($useragents)`

    @else if ($useragent == 'android-2-2') {
		$selector: append($selector, $o-useragent-android-2-2, comma);
	}

	and `oUseragentDeprecate ($useragents)`

	@else if ($useragent == 'android-2-2') {
		$o-useragent-android-2-2: example;
	}