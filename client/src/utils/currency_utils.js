/**
 * This file is meant to be where you will complete the utility function below, for performing a conversion of some amount
 * to another currency.
 */

/**
 * @typedef {Object} currencyConversionInput An object that contains the conversion rate for converting the CAD to the currency
 * @property {number} conversionRate
 */

/**
 * 
 * @receives two currency objects, currencyA and currencyB, as well as an integer-amount of cash in currencyA
 * @param {currencyConversionInput} currencySrc An object that contains the conversion rate for converting CAD to it 
 * @param {currencyConversionInput} currencyDest An object that contains the conversion rate for converting CAD to it
 * @param {Number} amount The amount of `currencySrc` that is going to be converted to destination currency 
 * @performs a currency conversion between integer amount of currencyA to an integer amount of currencyB
 * @returns An integer with a destination currency unit
 */
const convertCurrencyFunc = (currencySrc, currencyDest, amount) => {
  // This needs to be implemented
  return amount * (currencyDest.conversionRate / currencySrc.conversionRate)
}

export default convertCurrencyFunc