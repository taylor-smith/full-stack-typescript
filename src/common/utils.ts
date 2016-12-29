const UUID_RE = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

export const isObject = (x: any) => x && x.constructor === Object

export const isString = (x: any) => typeof x === 'string';

export const isNumber = (x: any) => typeof x === 'number';

export const isInteger = (x: any) => typeof Number.isSafeInteger(x);

export const isNonNegativeInteger = (x: any) => isInteger(x) && x >= 0;

export const isUuid = (x: any) => isString(x) && UUID_RE.test(x);

export const isUuidArray = (x: any) => Array.isArray(x) && x.find(y => !isUuid(y)) === undefined;
