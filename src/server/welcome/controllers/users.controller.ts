import { Request, Response, NextFunction, response } from 'express';

import { models } from '@db/models/repository';
import { statusCode } from '@utils/status_code/handler';

/**
 * Controlador que coordina la consulta de usuarios ficticios.
 * 
 * @function
 * @name UsersController
 * @param req - Propiedades de solicitud HTTP.
 * @param res - Propiedades de respuesta HTTP.
 * @param next - Continuación de flujo.
 * 
 * @returns {Promise<void>} Promesa que resuelve la consulta de usuarios ficticios.
*/
export const UsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


    const { FakeUser } = models;

    const users = await FakeUser.findAll();

    res.status(statusCode.OK);
    res.json({
        success: true,
        status_code: statusCode.OK,
        response: users
    });
    res.end();

}