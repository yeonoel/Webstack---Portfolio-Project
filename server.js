import startServer from './libs/boot';
import injectionMiddlewares from './libs/middlewares';
import injectionRoutes from './routes/index'

import express from 'express';

const port = process.env.PORT ||  5000;

const server = express()

injectionMiddlewares(server);
injectionRoutes(server);
startServer(server);
