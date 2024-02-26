const { sequelize, initConnection } = require("../config/database")
const Country = process.env.NODE_ENV === "test" ? undefined : require('../models/Country')
const Currency = process.env.NODE_ENV === "test" ? require('../models/testCurrency') : require('../models/Currency')

console.log(process.env.NODE_ENV)

initConnection()

sequelize.sync().then(() => {
    Country.bulkCreate(
        [
            { name: "Canada" },
            { name: "USA" },
            { name: "United Kingdom" }
        ])
        .then(() => {

            Currency.bulkCreate([
                { currencyCode: "CAD", countryId: 1, conversionRate: 1 },
                { currencyCode: "USD", countryId: 2, conversionRate: .74 }
            ])
        })
})

