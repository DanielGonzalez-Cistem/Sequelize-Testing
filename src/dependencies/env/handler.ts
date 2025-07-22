import dotenv from 'dotenv';
import env from 'env-var';

dotenv.config();

/**
 * Centralización de variables de entorno raíz.
 * @see {@link https://www.npmjs.com/package/env-var|**Documentación env-var**}
 */
export const rootEnvs = {
    NODE_ENV: env.get('NODE_ENV').required().asEnum(['development', 'production', 'test']),
    TIMEZONE: env.get('TIMEZONE').required().asString(),
}

/**
 * Centralización de variables de entorno para puertos de aplicación.
 * @see {@link https://www.npmjs.com/package/env-var|**Documentación env-var**}
 */
export const portEnvs = {
    PORT: env.get('PORT').required().asInt(),
}

/**
 * Centralización de variables de entorno para configuración a base de datos.
 * @see {@link https://www.npmjs.com/package/env-var|**Documentación env-var**}
 */
export const dbEnvs = {
    DB_SERVER: env.get('DB_SERVER').required().asString(),
    DB_USER: env.get('DB_USER').required().asString(),
    DB_PWD: env.get('DB_PWD').required().asString(),
    DB_NAME: env.get('DB_NAME').required().asString(),
    DB_PORT: env.get('DB_PORT').default('').asString(),
    DB_ENABLE_ENCRYPT: env.get('DB_ENABLE_ENCRYPT').required().asEnum(['YES', 'NO']),
    DB_ENABLE_TRUST_SERVER_CERTIFICATE: env.get('DB_ENABLE_TRUST_SERVER_CERTIFICATE').required().asEnum(['YES', 'NO']),
    DB_ENABLE_LOGS: env.get('DB_ENABLE_LOGS').required().asEnum(['YES', 'NO']),
}