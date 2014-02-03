'user strict';

var el = document.createElement('origami'),
    style = el.style,
    vendorPrefixes = 'Webkit Moz O ms',
    stylePrefixes = vendorPrefixes.split(' '),
    domPrefixes = vendorPrefixes.toLowerCase().split(' ');

/* 
 * Simple object type checker
 */
function is( obj, type ) {
    return typeof obj === type;
}

/*
 * Checks if a string contains another string
 */
function contains( str, substr ) {
    return ('' + str).indexOf(substr) + 1;
}

/*
 * Binding of a function to a given context
 */
function bind (func, obj) {
    if (Function.prototype.bind) {
        return func.bind(obj);
    } else {
        return function () {
            return func.apply(obj, arguments);
        };
    }
}

/*
 * Given a list of equivalent style properties (all but one of them containing a vendor prefix), returns the first one that is supported by the browser
 */
function getPrefixedStyleProp (prefixedProps) {
    for (var i in prefixedProps) {
        var prop = prefixedProps[i];
        if (!contains(prop, "-") && style[prop] !== undefined) {
            return prop;
        }
    }
    return false;
}

/*
 * Given a list of equivalent DOM properties (all but one of them containing a vendor prefix), returns the first one that is supported by the browser
 */
function getPrefixedDomProp (prefixedProps, obj, elem) {
    for (var i in prefixedProps) {
        var item = obj[prefixedProps[i]];
        if (item !== undefined) {

            if (elem === false) return prefixedProps[i];

            if (is(item, 'function')) {
                return bind(item, elem || obj);
            }

            return item;
        }
    }
    return false;
}

/*
 * Given a style property name returns the property name (possibly prefixed) if supported by the browser
 * Given a DOM property name and an object on which the property is expected to be defined, finds the 
 *  (possibly prefixed) property and:
 *      - if elem === false, returns the (possibly prefixed) property name 
 *      - if the value is a function, returns the function bound to obj (or to elem if defined)
 *      - otherwise returns the value of the property
 */
function getPrefixedProp (prop, obj, elem) {

    var uppercaseProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        prefixedProps;

    if (is(obj, "undefined")) {
        prefixedProps = (prop + ' ' + stylePrefixes.join(uppercaseProp + ' ') + uppercaseProp).split(' ');
        return getPrefixedStyleProp(prefixedProps);

    } else {
        prefixedProps = (prop + ' ' + (domPrefixes).join(uppercaseProp + ' ') + uppercaseProp).split(' ');
        return getPrefixedDomProp(prefixedProps, obj, elem);
    }
}

module.exports = getPrefixedProp;