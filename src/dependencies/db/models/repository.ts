import { dbConnection } from '../config/db.connection';

import { FakeUser } from './fake_user/fake.user.model';

/**
 * Función que centraliza los modelos SQL de la aplicación.
 * 
 * @function
 * @name repositoryModels
 * @returns Modelos de base de datos.
 */
const repositoryModels = () => {

    /**
     * Inicialización de conexión a base de datos.
     */
    const sequelize = dbConnection();

    //? Inicialización de modelos
    FakeUser.initModel(sequelize);

    //? Relaciones SQL


    return {
        FakeUser,
    }

}

/**
 * Exposición de modelos SQL, centralizados en un repositorio dinámico.
 */
export const models = repositoryModels();