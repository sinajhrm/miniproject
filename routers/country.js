const countriesRouter = require('express').Router()

const { Country } = require('../models/Country')


/** 
 * The code `countriesRouter.get('/', async (request, response) => { ... })` is defining a route 
 * handler for the GET request to the root path ("/") of the countriesRouter. 
 * @receives a get request to the URL: http://localhost:3001/api/country/
 * @returns with returning the data (all countries in database) as a JSON object
*/
countriesRouter.get('/', async (request, response) => {
    try {
        response.json(await Country.findAll());
    } catch (error) {
        console.log("An error happened while retrieving all countries from database!")
        response.status(500).send({ message: "An unknown error happened!" })
    }
})

/**
 * @receives a post request to the URL: http://localhost:3001/api/country,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
countriesRouter.post('/', async (request, response) => {
    if (!('name' in request.body)) {
        response.status(400).send({ error: "Content missing!" });
        return;
    }

    else {
        try {
            let country = await Country.findOne({ where: { name: request.body.name } })

            if (country !== null) {
                response.status(202).send({ error: "Country already exists!" })
                return;
            }

            await Country.create({ name: request.body.name })
                .then((createdCountry) => response.status(200).send(createdCountry))
        }
        catch (error) {
            console.log("An error happened while adding new country!")
            console.error(error.message)
            response.sendStatus(500);
        }
    }
})

/**
 * @receives a delete request to the URL: http://localhost:3001/api/country/:id,
 * @responds by returning a status code of 204
 */
countriesRouter.delete('/:id', async (request, response) => {
    if (!Number.isInteger(+request.params.id) || Number(request.params.id) < 1) {
        response.status(422).send("Unprocessable Entity");
        return;
    }

    try {
        let targetCountryIndex = await Country.findOne({ where: { id: +request.params.id } });

        if (targetCountryIndex === null) {
            response.status(404).send({ message: "The requested currency does not exist!" });
            return;
        }

        targetCountryIndex.destroy();
        response.status(204).send("Currency is deleted!");
    } catch (error) {
        console.log("An error happened while deleting the country: " + error.message)
        response.status(500).send({ error: "An error happened while deleting the requested country!" });
    }
})

module.exports = { countriesRouter }