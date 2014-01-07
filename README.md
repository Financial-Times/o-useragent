# Origami user agent <small>*o-useragent*</small>

This module provides sass variables for classes used to target particular user agents.

## Installation

To include `o-useragent` in your module or product run

	bower install o-useragent=http://git.svc.ft.com:9080/git/origami/o-useragent.git --save

## Usage

Add the following to the top of your SASS stylesheet

	@import "o-useragent/main";  

For a complete list of variables and their default values see [main.scss](http://git.svc.ft.com/blob/origami%2Fo-useragent.git/HEAD/main.scss).

To target styles at a given user agent interpolate the variable's name in a sass selector:

	#{$o-useragent-ie9} .list-item {
		//styles
	}

### Targeting styles at Internet Explorer
When writing components prefer to use `$o-useragent-ltie9` and `$o-useragent-ltie8`. As these classes are by default derived from the classes for specific ie browser versions it means your styles will be applied correctly regardless of whether the product follows the convention of applying styles to particular ie versions or to versions earlier than a given release.

###Product development
How the classes are added to the html of a product is left up to the product developer.

To override the default class name values (e.g. if your product already uses the class `lt-ie8`) redefine the variables *before* importing the main stylesheet

	$o-useragent-ie7: '.lt-ie8';
	$o-useragent-ltie8: '.lt-ie8';
	@import "o-useragent/main";