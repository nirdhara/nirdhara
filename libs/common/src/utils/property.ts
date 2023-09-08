/**
 * Determines whether an object has a property with the specified name.
 *
 * @param obj An object
 * @param property A property name.
 */
const has = (obj: any, property: PropertyKey): boolean =>
  [null, undefined].includes(obj) ? false : Object.prototype.hasOwnProperty.call(obj, property);

/**
 * Returns a string representation of an object.
 *
 * @param obj An object
 */
const toString = (obj: unknown): string => Object.prototype.toString.call(obj);

// Grouped export
export const Property = { has, toString };
