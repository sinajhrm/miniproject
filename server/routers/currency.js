const currenciesRouter = require('express').Router()
const Currency = process.env.NODE_ENV === "test" ? require('../models/testCurrency') : require('../models/Currency')

currenciesRouter.get('/', async (request, response) => {
	try {
		const currencies = await Currency.findAll();
		response.json(currencies);
	} catch (error) {
		console.log("Error happened while getting all currencies from DB!")
		console.error(error.message)
		response.sendStatus(500);
	}
})

currenciesRouter.get('/:id', async (request, response) => {
	/*
	Based on this answer on stackoverflow: https://stackoverflow.com/a/42171674
	I use error code 422 as server's response for an invalid input
	*/
	if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
		response.status(422).send({ error: "Unprocessable Entity!" });
		return; // QUESTION: Is it a correct approach to terminate a request?
	}
	try {

		result = await Currency.findOne({ where: { id: +request.params.id } })

		if (result === null) {
			response.status(404).send({ error: "Resource not found!" });
			return;
		}

		response.json(result);
	}
	catch (error) {
		console.log("An error happened while getting currency with the given ID.")
		console.error(error.message)
		response.sendStatus(500);
	}
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
currenciesRouter.post('/', async (request, response) => {
	if (process.env.NODE_ENV !== "test")
		if (!('currencyCode' in request.body) ||
			!('countryId' in request.body) ||
			!('conversionRate' in request.body)) {
			response.status(400).send({ error: "Content missing!" });
			return;
		}
	if (Number.isNaN(+request.body.conversionRate) || +request.body.conversionRate <= 0) {
		response.status(422).send("Unprocessable Entity");
		return;
	}
	if (process.env.NODE_ENV != "test" && (!Number.isInteger(+request.body.countryId) || Number(request.body.countryId) < 1)) {
		response.status(422).send({ error: "Unprocessable Entity (Invalid Country Id)!" });
		return; // QUESTION: Is it a correct approach to terminate a request?
	}

	else {
		try {
			let currency = await Currency.findOne({ where: { currencyCode: request.body.currencyCode } })
			// let country = await Country.findOne({ where: { id: Number(request.body.countryId) } })

			if (currency !== null) {
				response.status(202).send({ message: "The given currency already exists in database!" })
				// return;
			}

			// if (country === null) {
			// 	response.status(400).send({ error: "Invalid country ID!" })
			// 	return;
			// }

			await Currency.create(
				request.body
			)

			response.status(200).send(request.body);
		}
		catch (error) {
			console.log("An error happened while adding new currency!")
			console.error(error.message)
			response.sendStatus(500);
		}
	}

})

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
currenciesRouter.put('/:id/:newRate', async (request, response) => {

	if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
		response.status(422).send("Unprocessable Entity");
		return;
	}
	if (Number.isNaN(+request.params.newRate) || +request.params.newRate <= 0) {
		response.status(422).send("Unprocessable Entity");
		return;
	}

	try {

		let targetCurrencyIndex = await Currency.findOne({ where: { id: +request.params.id } });

		if (targetCurrencyIndex === null) {
			console.log("Requested Currency does not exist!")
			response.status(404).send({ message: "The requested currency does not exist!" });
			return;
		}

		targetCurrencyIndex.conversionRate = +request.params.newRate;
		await targetCurrencyIndex.save();
		response.json(targetCurrencyIndex);
	}
	catch (error) {
		console.log("An error happened while updating conversion rate of currency: " + error.message)
		response.status(500).send({ error: "An error happened while updating conversion rate of currency!" });
	}

})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currenciesRouter.delete('/:id', async (request, response) => {
	if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
		response.status(422).send("Unprocessable Entity");
		return;
	}

	try {
		let targetCurrencyIndex = await Currency.findOne({ where: { id: +request.params.id } });

		if (targetCurrencyIndex === null) {
			response.status(404).send({ message: "The requested currency does not exist!" });
			return;
		}

		targetCurrencyIndex.destroy();

		// It seems like when sending 204 as status code,
		// the content of the response won't be shown to the user.
		// as a result when I send the del request to this endpoint,
		// the user won't receive the "Currency is deleted!" (or at least
		// REST Client VSCode extension doesn't show it)
		response.status(204).send("Currency is deleted!");
	} catch (error) {
		console.log("An error happened while deleting the currency: " + error.message)
		response.status(500).send({ error: "An error happened while deleting the requested currency!" });
	}
})

module.exports = { currenciesRouter }