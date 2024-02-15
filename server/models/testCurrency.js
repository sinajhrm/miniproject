const { sequelize } = require('../config/database')
const { Model, DataTypes } = require('sequelize')

class Currency extends Model { }
Currency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    currencyCode:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    conversionRate:
    {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: false,
    timestamps: false,
    modelName: "testCurrency"
})

module.exports = Currency
