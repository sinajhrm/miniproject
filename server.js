const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const currenciesRouter = require('./routers/currency')
const middlewares = require('./utils/middlewares')
const { initConnection: initDBConnection } = require('./utils/database')

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
app.use(middlewares.unknownMiddleware)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})