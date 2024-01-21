var morgan = require('morgan')

morgan.token('req-body', (request, response) => {
    return JSON.stringify(request.body)
})
morgan.token('req-params', (request, response) => {
    return JSON.stringify(request.params)
})
morgan.token('req-query', (request, response) => {
    return JSON.stringify(request.query)
})

// It seems like i cannot access response body as easy as I thought
// morgan.token('resp-body', (request, response) => {
//   return JSON.stringify(response.body)
// })

/* Useful examples: https://expressjs.com/en/resources/middleware/morgan.html */
const morgan_mw = morgan(':method :url :status :res[content] :res[content-length] ReqBody::req-body ReqParams::req-params ReqQuery::req-query - :response-time ms')


const unknownMiddleware = ((request, response, next) => {
    response.status(400).send({ error: "Unknown endpoint", requestParams: request.params, requestQuery: request.query, requestBody: request.body, requestURL: request.url });
    next()
})

module.exports = { morgan_mw, unknownMiddleware }
