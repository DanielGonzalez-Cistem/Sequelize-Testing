import { Request, Response, NextFunction } from 'express';

import { DbController } from './db.controller';
import { WelcomeController } from './welcome.controller';

/**
 * Difinición de tipos de controladores.
 */
type TypeControllers = 
    'db'       |
    'welcome'
;

/**
 * Definición dinámica de los controladores en el espacio de trabajo **Welcome**.
 */
type TypeAuthControllers = {
    [K in TypeControllers]: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

/**
 * Centralización de enrutadores del servidor **Auth**.
 */
const controllers: TypeAuthControllers = {
    db: DbController,
    welcome: WelcomeController
}

/**
 * Centralización de controladores de la sección **Welcome**.
 * 
 * @function
 * @name repositoryControllers
 * @param controller - Nombre de controlador a invocar.
 * @returns Controlador
 */
export const repositoryControllers = ( controller: TypeControllers ) => controllers[controller];