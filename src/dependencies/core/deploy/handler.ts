import fs from 'fs';
import http from 'http';
import https from 'https';

import { IDeployServer, IGetNetworks } from './interfaces/network.interface';
import { getNetworks } from './helpers/networks.helper';

import { rootEnvs } from '@env/handler';

//! Habilite solo si necesitará WebSocket
// import { startWebSocketServer } from '@websocket/handler'; 

/**
 * Función que obtiene las interfaces de red para entrelazarla con un servidor.
 * 
 * @function
 * @name deployNetworks
 * @param args Argumentos de despliegue de interfaces de red.
 * @param args.enableSocket Bandera que indica si requerirá de configuración WebSocket.
 * @param args.environment Define el entorno a ejecutar.
 * @param args.port Define el número de puerto de despliegue.
 * @param args.server Define el servidor a ejecutar.
 */
export const deployNetworks = ( args: IDeployServer ): void => {

    //? Desestructuración de argumentos
    const { environment, port, server } = args;

    /**
     * Inicializar instancia de servidor.
     */
    let initServer: http.Server | https.Server;

    /**
     * Crear servidor dependiendo del entorno y certificados
     */
    initServer = http.createServer(server);

    /**
     * Detectar si el servidor es HOST por su constructor
     */
    const isHttps = initServer instanceof https.Server;

    /**
     * Protocolo de comunicación del servidor.
     */
    const protocol = isHttps ? 'https' : 'http';

    //* Despliegue de servidor con interfaces de red
    initServer.listen(port, '0.0.0.0', () => {

        console.log(`⚡[${environment}] running at: `);
        console.log(`  ➜ Local:   ${isHttps ? 'https' : 'http'}://localhost:${port}`);

        const networkAddresses = getNetworks({
            port,
            suffix: 'http'
        });

        for (const addr of networkAddresses) {
            console.log(`  ➜ Network: ${addr}\n`);
        }
        
    });

}