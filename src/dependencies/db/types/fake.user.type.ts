import { Optional } from 'sequelize';

import { IBaseFakeUser } from '@interfaces/fake.user.interface';

/**
 * Definición de tipado de la entidad **Fake User** para modeloado SQL.
 */
export type FakeUserCreationAttributes = Optional<IBaseFakeUser, 'idUser'>;