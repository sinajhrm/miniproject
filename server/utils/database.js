const { Sequelize } = require('sequelize');
const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.EXTRL_DB_WUP_URL,
    {
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });


const initConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB authentication successful!");
    } catch (error) {
        console.error("An error happened while initializing DB connection!");
    }
}

module.exports = {sequelize, initConnection}