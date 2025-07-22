import { Request, Response, NextFunction } from 'express';

import { dbConnection } from '@db/config/connection';
import { statusCode } from '@utils/status_code/handler';

/**
 * Controlador que coordina una prueba de conexión a base de datos.
 * 
 * @function
 * @name DbController
 * @param req - Propiedades de solicitud HTTP.
 * @param res - Propiedades de respuesta HTTP.
 * @param next - Continuación de flujo.
 * 
 * @returns {Promise<void>} Promesa que resuelve una prueba de conexión a base de datos.
*/
export const DbController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    /**
     * Instancia de conexión a base de datos.
     */
    const sequelize = dbConnection();

    try {

        await sequelize.authenticate();
     
        res.status(statusCode.OK);
        res.json({
            success: true,
            status_code: statusCode.OK,
            response: {
                message: 'Conexión a base de datos establecida exitosamente'
            }
        });
        res.end();

    } catch (error) {

        console.log('ERROR [DB]: ', error);
        
    }

}