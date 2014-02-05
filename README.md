# Origami user agent <small>*o-useragent*</small>

This module provides sass variables for classes used to target particular user agents and a javascript utility for working with vendor-prefixed properties.

## Installation

To include `o-useragent` in your module or product run

	bower install o-useragent=https://github.com/Financial-Times/o-useragent.git --save

## Usage

Add the following to the top of your SASS stylesheet

	@import "o-useragent/main";  

For a complete list of supported useragents and the default values of the classes that target them see [main.scss](https://github.com/Financial-Times/o-useragent/blob/master/src/scss/_variables.scss).

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

### Product development
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

### Vendor prefixes
This module also provides a javascript utility, `o-useragent#prefixer` to retrieve a vendor-prefixed property if the browser doesn't yet support it unprefixed e.g. if passed in `transition-duration` in newer browsers it will return `transition-duration`, but will return `-webkit-transition-duration`, `-ms-transition-duration` etc... in older browsers. It can be used for either DOM or style properties as follows (NB: below 'correct' means the correct choice of unprefixed or vendor prefixed property as defined in the browser)

#### Style properties
* `o-useragent#prefixer('transition-duration')`: returns the correct hyphenated css property name
* `o-useragent#prefixer('transitionDuration')`: returns the correct camel-cased el.style property name

#### Dom properties
*Note - the following also support being passed in hyphenated property names*

* `o-useragent#prefixer('applicationCache', window)`: returns the correct applicationCache object
* `o-useragent#prefixer('postMessage', window)`: returns the correct postMessage method bound to the window object
* `o-useragent#prefixer('matchesSelector', HTMLElement.prototype, document.body)`: returns the correct matchesSelector method bound to the document.body
* `o-useragent#prefixer('applicationCache', window, false)`: returns the correct *camel-cased* property name for the applicationCache object



## Adding a new user agent

To extend this module to target additional user agents you will need to 

1. Give the useragent you're targeting a sensible abbreviated name, including the version number (separated with underscores or hyphens, not dotted) only if you are certain you only need to target that particular version: e.g. opera-mobile, android-2-2	
2. Add a new useragent class variable to `src/scss/_variables.scss` e.g `$o-useragent-android-2-2: '.o-useragent-android-2-2' !default; 
3. In `src/scss/_mixins.scss` add new rules to `oUseragentTarget ($useragents)`

	    @else if ($useragent == 'android-2-2') {
			$selector: append($selector, $o-useragent-android-2-2, comma);
		}

	and `oUseragentDeprecate ($useragents)`

		@else if ($useragent == 'android-2-2') {
			$o-useragent-android-2-2: example;
		}
