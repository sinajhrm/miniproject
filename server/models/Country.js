const { sequelize } = require('../config/database')
const { DataTypes, Model } = require('sequelize')

class Country extends Model { }

Country.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    sequelize,
    underscored: false,
    timestamps: true,
    modelName: "Country"
}
)

module.exports = { Country } 