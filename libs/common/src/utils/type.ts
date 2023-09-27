import { Property } from './property';

/**
 * Checks if a given value is an instance of the Error object.
 * @param value - The value to check.
 * @returns Returns `true` if the value is an instance of the Error object, else `false`.
 */
const isError = (value: any): boolean => Property.toString(value) === '[object Error]';

/**
 * Determines whether the given value is an object or not.
 * @param value - The value to check.
 * @returns Returns `true` if the value is an object, `false` otherwise.
 */
const isObject = (value: any): boolean => Property.toString(value) === '[object Object]';

/**
 * Checks if a given value is an array.
 * @param value - The value to check.
 * @returns Returns `true` if the value is an array, `false` otherwise.
 */
const isArray = (value: any): boolean => Property.toString(value) === '[object Array]';

/**
 * Checks if a value is a boolean or a string representation of a boolean.
 * @param value - The value to check.
 * @returns Returns `true` if the value is a boolean or a string representation of a boolean, false otherwise.
 */
const isBoolean = (value: any): boolean => typeof value === 'boolean' || ['true', 'false'].includes(value);

/**
 * Checks if a value is a number.
 * true and false boolean values are considered as numbers, so the second check is required.
 * @param value - The value to check.
 * @returns Returns `true` if the value is a number, `false` otherwise.
 */
const isNumber = (value: any): boolean => !Number.isNaN(value) && typeof value !== 'boolean';

/**
 * Determines whether a given value is an integer.
 * @param value The value to check.
 * @returns Returns `true` if the value is an integer, false otherwise.
 */
const isInteger = (value: any): boolean => (isNumber(value) ? Number.parseFloat(value) % 1 === 0 : false);

/**
 * Checks if a given value is a double.
 * @param value The value to check.
 * @returns Returns `true` if the value is a double, false otherwise.
 */
const isDouble = (value: any): boolean => (isNumber(value) ? Number.parseFloat(value) % 1 !== 0 : false);

/**
 * Checks if a value is a string.
 * @param value - The value to check.
 * @returns Returns `true` if the value is a string, false otherwise.
 */
const isString = (value: any): boolean => typeof value === 'string';

export const Type = { isError, isObject, isArray, isBoolean, isNumber, isInteger, isDouble, isString };
