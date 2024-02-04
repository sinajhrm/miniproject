/**
 * @typedef {object} UpdateCurrencyRequestParam
 * @property {number} id
 * @property {number} newRate (A number with floating point)
 * 
 * @typedef {object} AddCurrencyRequestParam
 * @property {number} countryId
 * @property {String} currencyCode
 * @property {number} conversionRate
 * 
 * @typedef { object } Currency
 * @property { number } id
 * @property { number } countryId
 * @property { string } currencyCode
 * @property { number } conversionRate
 * 
 * @typedef {object} Country
 * @property {number} id
 * @property {string} name
 * 
 * @typedef {object} AddCountryRequestParam
 * @property {string} name
 * 
 * @typedef {object} CollapsibleProps
 * @property {boolean?} open
 * @property {string} title
 * @property {*} children
 */
export const Types = {}