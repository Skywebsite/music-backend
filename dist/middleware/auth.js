"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const accessTokenOptions = {
    expiresIn: env_1.env.jwtExpiresIn,
};
const refreshTokenOptions = {
    expiresIn: env_1.env.refreshJwtExpiresIn,
};
function signAccessToken(userId) {
    return jsonwebtoken_1.default.sign({ sub: userId }, env_1.env.jwtSecret, accessTokenOptions);
}
function signRefreshToken(userId) {
    return jsonwebtoken_1.default.sign({ sub: userId }, env_1.env.refreshJwtSecret, refreshTokenOptions);
}
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = auth.slice('Bearer '.length);
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.userId = payload.sub;
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
