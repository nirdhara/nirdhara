/**
 * Checks if an object has a given property.
 *
 * @param obj - The object to check.
 * @param property - The property to check for.
 * @returns `true` if the object has the property, `false` otherwise.
 */
const has = (obj: any, property: PropertyKey): boolean =>
  [null, undefined].includes(obj) ? false : Object.prototype.hasOwnProperty.call(obj, property);

/**
 * Returns a string representation of the given object.
 *
 * @param obj - The object to get the string for.
 * @returns A string representation of the given object.
 */
const toString = (obj: unknown): string => Object.prototype.toString.call(obj);

// Grouped export
export const Property = { has, toString };
