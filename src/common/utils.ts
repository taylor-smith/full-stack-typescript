export const isObject = (x: any) => x && x.constructor === Object

export const isString = (x: any) => typeof x === 'string';

export const isNumber = (x: any) => typeof x === 'number';

export const isInteger = (x: any) => typeof Number.isSafeInteger(x);

export const isUUID = (x: any) => isString(x) 