import { Property } from './property';

/**
 * Returns true if value is an error.
 *
 * @param value
 */
const isError = (value: any): boolean => Property.toString(value) === '[object Error]';

/**
 * Returns true if value is an object.
 *
 * @param value
 */
const isObject = (value: any): boolean => Property.toString(value) === '[object Object]';

/**
 * Returns true if value is an array.
 *
 * @param value
 */
const isArray = (value: any): boolean => Property.toString(value) === '[object Array]';

/**
 * Returns true if value is a boolean(string or literal).
 *
 * @param value
 */
const isBoolean = (value: any): boolean => typeof value === 'boolean' || ['true', 'false'].includes(value);

/**
 * Returns true if value is a number.
 * true and false boolean values are considered as numbers, so the second check is required.
 *
 * @param value
 */
const isNumber = (value: any): boolean => !Number.isNaN(value) && typeof value !== 'boolean';

/**
 * Returns true if value is an Integer
 *
 * @param value
 */
const isInteger = (value: any): boolean => (isNumber(value) ? Number.parseFloat(value) % 1 === 0 : false);

/**
 * Returns true if value is a Double
 *
 * @param value
 */
const isDouble = (value: any): boolean => (isNumber(value) ? Number.parseFloat(value) % 1 !== 0 : false);

/**
 * Returns true if value is a number.
 * true and false boolean values are considered as numbers, so the second check is required.
 *
 * @param value
 */
const isString = (value: any): boolean => typeof value === 'string';

export const Type = { isError, isObject, isArray, isBoolean, isNumber, isInteger, isDouble, isString };
