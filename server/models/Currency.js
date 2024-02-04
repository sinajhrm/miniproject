const { Country } = require('./Country')
const { sequelize } = require('../utils/database')
const { DataTypes, Model, Deferrable } = require('sequelize')

class Currency extends Model { }

Currency.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    currencyCode:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
            // For my reference: https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options
            // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
            // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
            // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        }
    },
    conversionRate:
    {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: false,
    timestamps: true,
    modelName: "Currency"
})

// For my reference: https://sequelize.org/docs/v6/core-concepts/assocs/#doing-both-things
Currency.belongsTo(Country, { as: 'country', foreignKey: 'countryId' })

module.exports = { Currency } 