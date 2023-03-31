import AuthController from "../controllers/AuthController.js";
import UsersController from '../controllers/UsersController.js';
import AppController from '../controllers/AppController.js';
import HomesController from '../controllers/HomesController.js';
import { xtokenAuthenticate} from '../middlewares/auth.js'
import { upload } from "../middlewares/multer-config.js";

const injectionRoutes = (api) => {
    api.get('/status', AppController.getStatus);                                    //ok
    api.get('/stats', AppController.getStats);                                      //ok

    api.post('/login', AuthController.login);                                       //ok
    api.get('/logout', xtokenAuthenticate,  AuthController.getDisconnect);

    // Routes for users
    api.post('/signup', UsersController.createAccount);                             //ok
    api.get('/getMe', xtokenAuthenticate, UsersController.getMe);                   //ok

    api.put('/updateAccount', xtokenAuthenticate, UsersController.putAccount);
    api.delete('/delateAccount', xtokenAuthenticate, UsersController.delAccount);

    // Routes for Homes
    api.get('/AllHomes', HomesController.getAllHomes);
    api.get('/AllHomes/:id', HomesController.getOneHome);
    api.post('/postNewHome', xtokenAuthenticate, upload, HomesController.postNewHome);
        //Find furnished residences published by a person using his userId
    api.get('/myResidences/:usId', xtokenAuthenticate, HomesController.getMyResidences); 

    api.put('/updateHome/:id', xtokenAuthenticate, HomesController.putHome);
    api.delete('/deleteHome/:id',  xtokenAuthenticate, HomesController.delHome);

}

export default injectionRoutes;