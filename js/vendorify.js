'user strict';

var el = document.createElement('origami'),
    style = el.style,
    vendorPrefixes = 'Webkit Moz O ms',
    stylePrefixes = vendorPrefixes.split(' '),
    domPrefixes = vendorPrefixes.toLowerCase().split(' ');
    
function is( obj, type ) {
    return typeof obj === type;
}

function contains( str, substr ) {
    return ('' + str).indexOf(substr) + 1;
}

function bind (func, obj) {
    if (Function.prototype.bind) {
        return func.bind(obj);
    } else {
        return function () {
            return func.apply(obj, arguments);
        };
    }
}

function getPrefixedStyleProp (props) {
    for (var i in props) {
        var prop = props[i];
        if (!contains(prop, "-") && style[prop] !== undefined) {
            return prop;
        }
    }
    return false;
}

function getPrefixedDomProp (props, obj, elem) {
    for (var i in props) {
        var item = obj[props[i]];
        if (item !== undefined) {

            if (elem === false) return props[i];

            if (is(item, 'function')) {
                return bind(item, elem || obj);
            }

            return item;
        }
    }
    return false;
}

function getPrefixedProp (prop, obj, elem) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props;

    if (is(obj, "undefined")) {
        props = (prop + ' ' + stylePrefixes.join(ucProp + ' ') + ucProp).split(' ');
        return getPrefixedStyleProp(props);

    } else {
        props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
        return getPrefixedDomProp(props, obj, elem);
    }
}

module.exports = getPrefixedProp