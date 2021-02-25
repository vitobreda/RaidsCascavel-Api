"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenParser = void 0;
const jwt = require("jsonwebtoken");
const users_model_1 = require("../users/users.model");
const environment_1 = require("../common/environment");
<<<<<<< HEAD
/*
  Esse conjunto de função tem como objetivo remover o token da requisição
  validar e buscar o usuario vinculado ao token em um novo parametro da
  requisição.
*/
exports.tokenParser = (req, resp, next) => {
=======
const tokenParser = (req, resp, next) => {
>>>>>>> origin/back_to_begin
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
exports.tokenParser = tokenParser;
function extractToken(req) {
    //Authorization: Bearer TOKEN
    let token = undefined;
    const authorization = req.header("authorization");
    if (authorization) {
        const parts = authorization.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }
    return token;
}
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            users_model_1.User.findByEmail(decoded.sub)
                .then((user) => {
                if (user) {
                    //associar o usuário no request
                    req.authenticated = user;
                }
                next();
            })
                .catch(next);
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=token.parser.js.map