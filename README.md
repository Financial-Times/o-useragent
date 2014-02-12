# Origami user agent <small>*o-useragent*</small>

This module provides sass variables for classes used to target particular user agents and a javascript utility for working with vendor-prefixed properties.

## Installation

To include `o-useragent` in your module or product run

	bower install o-useragent=https://github.com/Financial-Times/o-useragent.git --save

## Sass
Add the following to the top of your SASS stylesheet

	@import "o-useragent/main";  

### Standard useragent names
The following strings are by convention used to target useragents. 

* chrome
* ie
* ff
* opera
* safari
* chromeandroid
* iossafari
* androidbrowser
* operamobile
* chromeios
* iemobile

### Module development

To target styles at a given user agent use the `oUseragentTarget($useragents[, $versions])` mixin. The mixin accepts two parameters:

 * `$useragents` - a space-separated list of useragents to target, each of which *may* end with a hyphenated version number
 * `$versions` - if `$useragents` specifies a single, unversioned useragent, multiple version numbers can be specified here

 #### Examples

```scss
// targets internet explorer 7 and 8 and opera
@include oUseragentTarget(ie7 ie8 opera) {
	.sel {
		//styles
	}
}

// targets firefox 3.2 and 3.3
@include oUseragentTarget(ff, 3-2 3-3) ...
```

### Polyfills
This module also contains a polyfill for Internet Explorer 7's lack of support for css `box-sizing`. e.g.

    .column {
		box-sizing: border-box;
		@include oUseragentIe7BoxSizing();
    }

### Product development

#### Using the build service
By default all styles intended for specific useragents is output by the build service. At present there is no way to easily determine if any of the modules your product uses contain any styles that target a given useragent. However, if yo know you need to support useragent X carry out your own ua-sniffing for X and conditionally add the class `o-useragent-X` to the `<html>` tag.

#### Custom builds
If you are [building your product's origami styles locally ](http://financial-times.github.io/ft-origami/docs/developer-guide/building-modules/) sass will log to the console any specific useragents being target with styles by your product's origami modules. These won't be output by default. To output useragent X you will need to carry out your own ua-sniffing for X and conditionally add a class of your choice, say `class-X`, to the `<html>` tag. Then in your sass:

```scss
.class-X {
	@extend %o-useragent-X !optional;
}
```

## Javascript

### Vendor prefixes
This module also provides a javascript utility, `o-useragent.prefixer` to retrieve a vendor-prefixed property if the browser doesn't yet support it unprefixed e.g. if passed in `transition-duration` in newer browsers it will return `transition-duration`, but will return `-webkit-transition-duration`, `-ms-transition-duration` etc... in older browsers. It can be used for either DOM or style properties as follows (NB: below 'correct' means the correct choice of unprefixed or vendor prefixed property as defined in the browser)

#### Style properties
* `o-useragent.prefixer('transition-duration')`: returns the correct hyphenated css property name
* `o-useragent.prefixer('transitionDuration')`: returns the correct camel-cased el.style property name

#### Dom properties
*Note - the following also support being passed in hyphenated property names*

* `o-useragent.prefixer('applicationCache', window)`: returns the correct applicationCache object
* `o-useragent.prefixer('postMessage', window)`: returns the correct postMessage method bound to the window object
* `o-useragent.prefixer('matchesSelector', HTMLElement.prototype, document.body)`: returns the correct matchesSelector method bound to the document.body
* `o-useragent.prefixer('applicationCache', window, false)`: returns the correct *camel-cased* property name for the applicationCache object