import { Dialect } from 'sequelize';

import { dbEnvs, rootEnvs } from '@env/handler';

export = {
    development: {
        username: dbEnvs.DB_USER,
        password: dbEnvs.DB_PWD,
        database: dbEnvs.DB_NAME,
        host: dbEnvs.DB_SERVER,
        dialect: 'mssql' as Dialect,
        dialectOptions: {
            options: {
                encrypt: dbEnvs.DB_ENABLE_ENCRYPT === 'YES',
            }
        }
    }
};



