const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
var morgan = require('morgan')

const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())


/* Useful examples: https://expressjs.com/en/resources/middleware/morgan.html */
app.use(morgan(':method :url :status :res[content] :res[content-length] - :response-time ms'))

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
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get('/api/currency/:id', (request, response) => {
  /*
   Based on this answer on stackoverflow: https://stackoverflow.com/a/42171674
   I use error code 422 as server's response for an invalid input
  */
  if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
    response.status(422).send({ error: "Unprocessable Entity!" });
    return; // QUESTION: Is it a correct approach to terminate a request?
  }

  result = currencies.find(currency => currency.id === parseInt(request.params.id))

  if (result === undefined) {
    response.status(404).send({ error: "Resource not found!" });
    return;
  }

  response.json(result);
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post('/api/currency', (request, response) => {
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
app.put('/api/currency/:id/:newRate', (request, response) => {

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
app.delete('/api/currency/:id', (request, response) => {
  if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
    response.status(422).send("Unprocessable Entity");
    return;
  }

  let targetCurrencyIndex = currencies.findIndex(currency => currency.id === Number(request.params.id));

  if (targetCurrencyIndex === -1) {
    response.send(404);
    return;
  }

  currencies.pop(targetCurrencyIndex);

  // It seems like when sending 204 as status code,
  // the content of the response won't be shown to the user.
  // as a result when I send the del request to this endpoint,
  // the user won't receive the "Currency is deleted!" (or at least
  // REST Client VSCode extension doesn't show it)
  response.status(204).send("Currency is deleted!");
})

app.use((request, response) => {
  response.status(400).send({ error: "Unknown endpoint", requestParams: request.params, requestQuery:request.query, requestBody:request.body, requestURL:request.url });
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})