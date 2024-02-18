require('dotenv').config()

const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const { currenciesRouter } = require('./routers/currency')
const { countriesRouter } = require('./routers/country')
const { currencyCountryRouter } = require('./routers/currency_coutnry')
const middlewares = require('./utils/middlewares')
const { initConnection: initDBConnection } = require('./config/database')

const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())
app.use(middlewares.morgan_mw)

initDBConnection();

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
	response.send('Hello World!')
})

app.use('/api/currency', currenciesRouter)
// if (process.env.NODE_ENV !== "test")
	app.use('/api/country', countriesRouter)
// if (process.env.NODE_ENV !== "test")
	app.use('/api/currency-country', currencyCountryRouter)
app.use(middlewares.unknownMiddleware)

const PORT = 3001
const CurrencyConverterServevr = app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})

module.exports = CurrencyConverterServevr