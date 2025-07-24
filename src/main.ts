import { useSetupServer } from './server/setup';

/**
 * Inicio de aplicación **REST API**.
 * 
 * @function
 * @name mainApp
 * @see {@link https://www.npmjs.com/package/typescript|**Documentación Typescript**}
 * @see {@link https://www.npmjs.com/package/ts-node-dev|**Documentación Ts-node-dev**}
 */
const mainApp = (): void => {

    const { deploy: deployServer } = useSetupServer();

    deployServer();

    console.log(`\n🟢 Sequelize Testing ha sido inicializado...\n`);

}

mainApp();