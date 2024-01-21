const currenciesRouter = require('express').Router()

/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
]


/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
currenciesRouter.get('/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
currenciesRouter.get('/:id', (request, response) => {
  /*
   Based on this answer on stackoverflow: https://stackoverflow.com/a/42171674
   I use error code 422 as server's response for an invalid input
  */
  if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
    response.status(422).send({ error: "Unprocessable Entity!" });
    return; // QUESTION: Is it a correct approach to terminate a request?
  }

  result = currencies.filter(currency => currency.id === parseInt(request.params.id))

  if (result.length === 0) {
    response.status(404).send({ error: "Resource not found!" });
    return;
  }

  response.json(result[0]);
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
currenciesRouter.post('/', (request, response) => {
  if (!('currencyCode' in request.body) ||
    !('country' in request.body) ||
    !('conversionRate' in request.body)) {
    response.status(400).send({ error: "Content missing!" });
    return;
  }
  if (Number.isNaN(+request.body.conversionRate) || +request.body.conversionRate <= 0) {
    response.status(422).send("Unprocessable Entity");
    return;
  }

  else {
    let newCurrency = request.body;
    newCurrency.id = currencies.length + 1;
    // currencies.push(newCurrency);
    //QUESTION: why I should use concat, filter, ...
    currencies = currencies.concat(newCurrency);
    response.status(200).send(newCurrency);
  }

})

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
currenciesRouter.put('/:id/:newRate', (request, response) => {

  if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
    response.status(422).send("Unprocessable Entity");
    return;
  }
  if (Number.isNaN(+request.params.newRate) || +request.params.newRate <= 0) {
    response.status(422).send("Unprocessable Entity");
    return;
  }

  let targetCurrencyIndex = currencies.findIndex(currency => currency.id === Number(request.params.id));

  if (targetCurrencyIndex === -1) {
    response.send(404);
    return;;
  }

  currencies[targetCurrencyIndex].conversionRate = +request.params.newRate;
  response.json(currencies[targetCurrencyIndex]);

})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currenciesRouter.delete('/:id', (request, response) => {
  if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
    response.status(422).send("Unprocessable Entity");
    return;
  }

  let newCurrencyList = currencies.filter(currency => currency.id !== Number(request.params.id));

  if (newCurrencyList.length !== currencies.length - 1) {
    response.send(404);
    return;
  }

  currencies = newCurrencyList;

  // It seems like when sending 204 as status code,
  // the content of the response won't be shown to the user.
  // as a result when I send the del request to this endpoint,
  // the user won't receive the "Currency is deleted!" (or at least
  // REST Client VSCode extension doesn't show it)
  response.status(204).send("Currency is deleted!");
})

module.exports = currenciesRouter