import startServer from './libs/boot.js';
import injectionMiddlewares from './libs/middlewares.js';
import injectionRoutes from './routes/index.js'
import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express()

injectionMiddlewares(server);
server.use('/images', express.static(path.join(__dirname, 'images')));
injectionRoutes(server);
startServer(server);