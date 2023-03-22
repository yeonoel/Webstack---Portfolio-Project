import startServer from './backend/libs/boot';
import injectionMiddlewares from './backend/libs/middlewares';
import injectionRoutes from './backend/routes/index'

import express from 'express';

const port = process.env.PORT ||  5000;

const server = express()

injectionMiddlewares(server);
injectionRoutes(server);
startServer(server);
