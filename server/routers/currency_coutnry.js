const currencyCountryRouter = require('express').Router()

const { Country } = require('../models/Country')
const { Currency } = require('../models/Currency')

currencyCountryRouter.get('/', async (request, response) => {
    await Currency.findAll({
        include: [{
            model: Country,
            as: 'country',
            attributes: ['name'],
        }],
        attributes: ['currencyCode'],
    }).then(
        (result) => {
            response.send(
                result.map(
                    value => {
                        return {
                            currencyCode: value.currencyCode,
                            country: value.country.name
                        }
                    }
                )
            )
        }
    )
});

module.exports = { currencyCountryRouter }
