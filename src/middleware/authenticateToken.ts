import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
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

export default authenticateToken;