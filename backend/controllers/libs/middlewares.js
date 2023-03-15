import express from 'express';

const injectionMiddlewares = (api) => {
    api.use(express.json());
}

export default injectionMiddlewares;