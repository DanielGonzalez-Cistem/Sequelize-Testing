import * as tedious from 'tedious';
import { DataTypes, Sequelize, Options } from 'sequelize';

import { dbEnvs, rootEnvs } from '@env/handler';

/**
 * Inicialización de instancia única de Sequelize.
 */
let sequelizeInstance: Sequelize;

/**
 * Anula el formato de zona horaria para fechas en MSSQL asignados en 'DataType.DATE'.
 * 
 * Esto soluciona un error en la formación de fechas y horas de Sequelize
 * para una base de datos MSSQL. Se debe a que Sequelize, añade el valor 
 * extra "+00:00", que no es compatible por MSSQL.
 * 
 * Más información, consulte esta liga de StackOverflow:
 * @see https://stackoverflow.com/questions/58034185/inserting-or-updating-a-date-field-give-the-following-error-conversion-failed-wh
 * 
 * ❌ ***ADVERTENCIA***: 
 * No se recomienda sobreescribir o modificar los 'prototypes' en JavaScript bajo
 * ningún concepto. Este caso es particular, debido a que es la mejor solución a 
 * este contexto. 
 * 
 * ! De otro modo, evite sobreescribir los 'prototypes'.
 * 
 * @param date - Define una fecha.
 * @param options - Define opciones alternativas.
 * @returns Fecha Formateada
 */
(DataTypes.DATE.prototype as any)._stringify = function (date: Date, options: any) {
    const offsetDate = this._applyTimezone(date, options);
    return (offsetDate).format('YYYY-MM-DD HH:mm:ss.SSS');
};

/**
 * Función que provee el objeto de conexión a base de datos.
 * 
 * @function
 * @name dbConnection
 * @returns Objeto de Conexión a Base de Datos
 */
export const dbConnection = (): Sequelize => {

    /**
     *  Configuración de propiedades de configuración Sequelize.
     */
    const sequelizeOptions: Options = {
        dialect: 'mssql',
        dialectModule: tedious,
        dialectOptions: {
            options: {
                encrypt: dbEnvs.DB_ENABLE_ENCRYPT === 'YES',
                trustServerCertificate: dbEnvs.DB_ENABLE_TRUST_SERVER_CERTIFICATE === 'YES'
            }
        },
        host: dbEnvs.DB_SERVER,
        logging: ( log: string ) => {
            if ( dbEnvs.DB_ENABLE_LOGS === 'YES' ) {
                console.log('[SEQUELIZE]: ', log);
                console.log('');
                return;
            }
        },
        pool: {
            acquire: 30000,
            idle: 10000,
            max: 10,
            min: 1,
        },
        timezone: rootEnvs.TIMEZONE,
    }

    //? Definimos el puerto SQL si es que se encuentra definido
    if ( dbEnvs.DB_PORT !== '') {
        sequelizeOptions.port = Number(dbEnvs.DB_PORT);
    }

    //* Si ya existe una instancia, se retorna directamente
    if ( sequelizeInstance ) return sequelizeInstance;

    sequelizeInstance = new Sequelize(dbEnvs.DB_NAME, dbEnvs.DB_USER, dbEnvs.DB_PWD, sequelizeOptions);

    return sequelizeInstance;

}