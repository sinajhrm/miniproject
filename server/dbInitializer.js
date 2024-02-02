const { sequelize, initConnection } = require("./utils/database")
const { Country } = require('./models/Country')
const { Currency } = require('./models/Currency')

initConnection()
Country.sync().then(() =>
    console.log("Successfully created Country Table")).catch((error) => {
        console.log(`An error happened while creating Country table: ${error.message}`)
    })
Currency.sync().then(() =>
    console.log("Successfully created Currency Table")).catch((error) => {
        console.log(`An error happened while creating Currency table: ${error.message}`)
    })


Country.bulkCreate(
    [
        { name: "Canada" },
        { name: "USA" },
        { name: "United Kingdom" },
    ])

Currency.bulkCreate([
    { currencyCode: "CAD", countryId: 1, conversionRate: 1 },
    { currencyCode: "USD", countryId: 2, conversionRate: .74 },
])

