const el = document.createElement('o');
const style = el.style;
const vendorPrefixes = 'Webkit Moz O ms';
const stylePrefixes = vendorPrefixes.split(' ');
const domPrefixes = vendorPrefixes.toLowerCase().split(' ');

/*
 * Simple object type checker
 */
const is = function (obj, type) {
	return typeof obj === type;
};

/*
 * Binding of a function to a given context
 */
const bind = function (func, obj) {
	if (Function.prototype.bind) {
		return func.bind(obj);
	} else {
		return function () {
			return func.apply(obj, arguments);
		};
	}
};

/*
 * Converts a hyphenated string to camel case
 */
const camelify = function (str) {
	return (str.indexOf('-') > -1) ? str.replace(/(?:\-)([a-z])/gi, function ($0, $1) {
		return $1.toUpperCase();
	}) : str;
};

/*
 * Converts a camelcase property to its hyphenated equivalent
 */
const hyphenateProp = function (prop) {
	if (prop) {
		return prop.replace(/([A-Z])/g, function ($0, $1) {
			return '-' + $1.toLowerCase();
		}).replace(/^ms-/, '-ms-');
	} else {
		return false;
	}
};

/*
 *  Gets a list of prefixed properties derived from a single w3c property name. It always has the unprefixed property as the first item in the list
 */
const getPrefixedPropList = function (prop, prefixes) {
	const capitalisedProp = prop.charAt(0).toUpperCase() + prop.slice(1);

	return (prop + ' ' + prefixes.join(capitalisedProp + ' ') + capitalisedProp).split(' ');
};

/*
 * Given a list of property names, returns the first name that is defined on an object. If none are defined returns false
 */
const getFirstDefinedProp = function (obj, propNameList) {
	for (const i in propNameList) {
		if (i) {
			const prop = propNameList[i];
			if (obj[prop] !== undefined) {
				return prop;
			}
		}
	}
	return false;
};

/*
 *  Returns the vendor prefixed version of a style property
 */
const stylePrefixer = function (stylePropName) {
	return getFirstDefinedProp(style, getPrefixedPropList(camelify(stylePropName), stylePrefixes));
};

/*
 *  Returns the vendor prefixed version of a dom property
 */
const domPrefixer = function (obj, domPropName) {
	return getFirstDefinedProp(obj, getPrefixedPropList(camelify(domPropName), domPrefixes));
};

/*
 *  Returns the hyphenated vendor prefixed version of a css property
 */
const cssPrefixer = function (cssPropName) {
	return hyphenateProp(stylePrefixer(cssPropName));
};

/*
 *  Returns the value of a vendor prefixed version of a dom property
 */
const getDomProperty = function (obj, domPropName) {
	const prop = obj[domPrefixer(obj, domPropName)];
	return is(prop, 'undefined') ? false : prop;
};

/*
 *  Returns a vendor prefixed DOM method bound to a given object
 */
const getDomMethod = function (obj, domPropName, bindTo) {
	const prop = getDomProperty(obj, domPropName);

	return is(prop, 'function') ? bind(prop, obj || bindTo) : false;
};

/*
 *  Returns the value of a vendor prefixed version of a style property
 *  If a list of properties is requested returns a hash table of the form { requestedPropertyName {prefixedName: 'webkitStyle', value: '10px'}}
 */
const getStyleValue = function (element, stylePropNames) {
	const computedStyle = getComputedStyle(element, null);
	const result = {};
	let prefixedName;
	if (stylePropNames.indexOf(' ') === -1) {
		return computedStyle.getPropertyValue(cssPrefixer(stylePropNames));
	}

	stylePropNames = stylePropNames.split(' ');

	for (let i = stylePropNames.length - 1; i >= 0; i--) {
		prefixedName = cssPrefixer(stylePropNames[i]);

		result[stylePropNames[i]] = {
			prefixedName: prefixedName,
			value: computedStyle.getPropertyValue(prefixedName)
		};
	}

	return result;
};

module.exports = {
	css: cssPrefixer,
	style: stylePrefixer,
	dom: domPrefixer,
	getStyleValue: getStyleValue,
	getDomProperty: getDomProperty,
	getDomMethod: getDomMethod
};
