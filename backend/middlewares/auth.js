import { getUserFromAuthorization, getUserfromXtoken } from "../utils/auth"

export const basicAuthentification = async (res, req, next) => {
    const user = getUserFromAuthorization(req);

    if (!user) {
        res.status(401).json({error : 'Auhtorized'});
        return;
    }

    req.user = user;
    next();
}

export const xtokenAuthenticate = async (req, res, next) => {
    const user = getUserfromXtoken(req);

    if (!user) {
        res.status(401).json({ error: 'UnAuthorized'});
        return
    }

    req.user = user;
    next();
}