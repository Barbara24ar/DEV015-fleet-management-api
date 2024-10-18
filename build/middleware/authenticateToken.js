"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateToken = (req, res, next) => {
    //const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(' ')[1];
    //if (!token) return res.sendStatus(401);
    //jwt.verify(token, 'SECRET_KEY', (err, user) => {
    //if (err) return res.sendStatus(401);
    //req.user = user;
    //next();
    //});
    next();
};
exports.default = authenticateToken;
