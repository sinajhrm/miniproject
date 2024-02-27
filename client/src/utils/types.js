/**
 * @typedef {object} UpdateCurrencyRequestParam
 * @property {number} id
 * @property {number} newRate A positive number with floating point
 * 
 * @typedef {object} AddCurrencyRequestParam
 * @property {number} countryId
 * @property {String} currencyCode
 * @property {number} conversionRate A positive number with floating point
 * 
 * @typedef { object } Currency
 * @property { number } id
 * @property { number } countryId
 * @property { string } currencyCode
 * @property { number } conversionRate A positive number with floating point
 *
 * @typedef { object } CurrencyConvert Can be use as source or destination currency in ConvertCurrency function
 * @property { number } conversionRate A positive number with floating point
 * 
 * @callback CurrencyConvertFunc
 * @param {CurrencyConvert} currencySrc 
 * @param {CurrencyConvert} currencyDest 
 * @param {Number} amount
 * @returns {Number} The converted value
 * 
 * @typedef {object} Country
 * @property {number} id
 * @property {string} name
 * 
 * @typedef {object} AddCountryRequestParam
 * @property {string} name
 * 
 * @typedef {object} ConvertCurrencyProps
 * @property {Array<Currency>} available_currencies
 * @property {CurrencyConvertFunc|any} currencyConvertCallback
 * 
 * @typedef {object} UpdateCurrencyProps
 * @property {Array<Currency>} available_currencies
 * @property {function(boolean):null} currenciesUpdateTrigger
 * 
 * @typedef {object} DeleteCurrencyProps
 * @property {Array<Currency>} available_currencies
 * @property {function(boolean):null} currenciesUpdateTrigger
 * 
 * @typedef {object} AddCurrencyProps
 * @property {Array<Country>} available_countries
 * @property {function(boolean):null} currenciesUpdateTrigger
 * 
 * @typedef {object} AddCountryProps
 * @property {function(boolean):null} countriesUpdateTrigger
 * 
 * @typedef {object} DeleteCountryProps
 * @prop {Array<Country>} available_countries
 * @property {function(boolean):null} countriesUpdateTrigger
 * 
 * @typedef {object} CollapsibleProps
 * @property {boolean?} open
 * @property {string} title
 * @property {*} children
 */
export const Types = {}