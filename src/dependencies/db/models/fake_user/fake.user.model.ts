import { DataTypes, Model, Sequelize } from 'sequelize';

import { IBaseFakeUser } from '@interfaces/fake.user.interface';


import { FakeUserCreationAttributes } from '../../types/fake.user.type';

/**
 * Definición de atributos de la entidad **Fake User**.
 */
export class FakeUser extends Model<IBaseFakeUser, FakeUserCreationAttributes> implements IBaseFakeUser {

    public idUser?: number|undefined;
    public email!: string;
    public createdAt?: Date|undefined;

    /**
     * Método estático que inicializa el modelo SQL de la entidad.
     * @param sequelize Instancia SQL.
     * @returns Modelo SQL.
     */
    static initModel ( sequelize: Sequelize ) {
        FakeUser.init(
            {
                idUser: {
                    field: 'UsuarioID',
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    field: 'Correo',
                    type: DataTypes.STRING(30),
                    allowNull: false
                },
                createdAt: {
                    field: 'FechaAlta',
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('GETDATE()')
                }
            },
            {
                sequelize,
                tableName: 'ST_FakeUsers',
                modelName: 'fake_user',
                timestamps: true,
                createdAt: 'FechaAlta',
                updatedAt: false
            }
        );

        return FakeUser;
    }

}