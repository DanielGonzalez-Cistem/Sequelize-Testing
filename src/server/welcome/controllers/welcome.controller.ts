import { Request, Response, NextFunction } from 'express';

import { rootEnvs } from '@env/handler';
import { statusCode } from '@utils/status_code/handler';

/**
 * Controlador que coordina la prueba de conexión al servidor **Auth**.
 * 
 * @function
 * @name WelcomeController
 * @param req - Propiedades de solicitud HTTP.
 * @param res - Propiedades de respuesta HTTP.
 * @param next - Continuación de flujo.
 * 
 * @returns {Promise<void>} Promesa que resuelve la prueba de conexión al servidor **Auth**.
*/
export const WelcomeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    res.status(statusCode.OK);
    res.json({
        message: `¡Bienvenido a Sequelize Testing! :D`
    });
    res.end();

}