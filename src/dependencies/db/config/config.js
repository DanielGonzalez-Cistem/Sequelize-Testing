require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_SERVER,
        dialect: "mssql",
        dialectOptions: {
            options: {
                encrypt: process.env.DB_ENABLE_ENCRYPT === 'YES',
                trustServerCertificate: process.env.DB_ENABLE_TRUST_SERVER_CERTIFICATE === 'YES'
            }
        }
    },
    test: {
        //NOTE: Coloque aquí las configuraciones para PRUEBAS
    },
    production: {
        //NOTE: Coloque aquí las configuraciones para PRODUCCIÓN
    }
};