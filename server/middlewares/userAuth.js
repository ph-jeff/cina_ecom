const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.SECRET_KEY;

const isLogin = (req, res, next) => {
    const token = req.cookies.u_token;
    if (!token){
        res.locals.userID = null;
        return res.status(401).json({ error: 'You are not logged in' });
    }

    jwt.verify(token, secret, async(error, decodedToken) => {
        if (error){
            res.locals.userID = null;
            return res.status(403).json({ error: 'Invalid token' });
        }

        const user = await User.findById(decodedToken.id)
        if(!user){
            res.locals.userID = null;
            return res.status(403).json({ error: 'The user has been deleted' });
        }

        res.locals.userID = decodedToken.id;
        next();
    });
};

const isAdminLogin = (req, res, next) => {
    const token = req.cookies.a_token;
    if (!token){
        res.locals.userID = null;
        return res.status(401).json({ error: 'You are not logged in' });
    }

    jwt.verify(token, secret, (error, decodedToken) => {
        if (error){
            res.locals.userID = null;
            return res.status(403).json({ error: 'Invalid token' });
        }
        res.locals.userID = decodedToken.id;
        next();
    });
};

module.exports = { isLogin, isAdminLogin };