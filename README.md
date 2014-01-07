# Origami user agent <small>*o-useragent*</small>

This module provides sass variables for classes used to target particular user agents.

## Installation

To include `o-useragent` in your module or product run

	bower install o-useragent=http://git.svc.ft.com:9080/git/origami/o-useragent.git --save

## Usage

Add the following to the top of your SASS stylesheet

	@import "o-useragent/main";  

The following variables are available, with default values as listed

* $o-useragent-ie9: '.o-useragent-ie9'
* $o-useragent-ie8: '.o-useragent-ie8'
* $o-useragent-ie7: '.o-useragent-ie7'
* $o-useragent-ltie9: $o-useragent-ie7, $o-useragent-ie8 
* $o-useragent-ltie8: $o-useragent-ie7 

To target styles at a given user agent interpolate the variable's name in a sass selector

	#{$o-useragent-ie9} .list-item {
		//styles
	}

### Writing styles for Internet Explorer (component developers mostly)
In general prefer to use `$o-useragent-ltie9` and `$o-useragent-ltie8`. As these classes are by default derived from the classes for specific ie browser versions it means your styles will be applied correctly regardless of whether the product follows the convention of applying styles to particular ie versions or to versions earlier than a given release.

### Over-riding default class names (product developers only)

To override the default values redefine the variables *before* importing the main stylesheet

	$o-useragent-ie7: '.lt-ie8';
	@import "o-useragent/main";  
	
