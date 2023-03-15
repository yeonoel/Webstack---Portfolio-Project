

const injectionRoutes = (api) => {
    api.get('/connect');
    api.get('/disconnect');

    api.post('/creaAcout',);
    api.del('/delAcount', );

    api.get('/getAllHomes', );
    api.get('/getOneHome/:id');
    api.post('/postHome', );

    api.put('/putHome/:id', );
    api.del('/delHome/:id', );

}

export default injectionRoutes;