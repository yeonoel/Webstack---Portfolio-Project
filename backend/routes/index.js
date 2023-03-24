import AuthController from "../controllers/AuthController";
import UsersController from '../controllers/UsersController';
import AppController from '../controllers/UsersController';
import HomesController from "../controllers/HomesController";

import { basicAuthentification, xtokenAuthenticate} from '../middlewares/auth'

const injectionRoutes = (api) => {
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);

    api.get('/getConnect', basicAuthentification,  AuthController.getConnect);
    api.get('/getDisconnect', xtokenAuthenticate,  AuthController.getDisconnect);

    api.post('/createAccount', UsersController.createAccount);
    await.get('/getMe', xtokenAuthenticate, UsersController.getMe);

    api.put('/updateAccount', xtokenAuthenticate, UsersController.putAccount);
    api.del('/delateAccount', xtokenAuthenticate, UsersController.delAccount);

    api.get('/AllHomes', FileController.getAllHome);
    // api.get('/oneHome/:id', );
    api.post('/newHome', xtokenAuthenticate, HomesController.postNewHome);

    api.put('/updateHome/:id', xtokenAuthenticate, HomesController.putHome);
    api.del('/deleteHome/:id', xtokenAuthenticate, HomesController.delHome);

}

export default injectionRoutes;