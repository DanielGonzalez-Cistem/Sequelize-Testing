/**
 * Definición de propiedades de la entidad **Fake User**.
 */
export interface IBaseFakeUser {
    idUser?: number;
    email: string;
    createdAt?: Date;
}

/**
 * Definición de atributos de la entidad **Fake User** para editar.
 */
export type IFakeUserOptional = Partial<IBaseFakeUser>;