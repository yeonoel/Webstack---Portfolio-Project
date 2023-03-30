import express from 'express';
import cors from 'cors'


const injectionMiddlewares = (api) => {
    api.use(express.json());
    api.use(cors());
    
  
}

export default injectionMiddlewares;