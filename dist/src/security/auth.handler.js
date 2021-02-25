"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users.model");
const environment_1 = require("../common/environment");
<<<<<<< HEAD
/*
  Serviço para se autenticar na api
*/
exports.authenticate = (req, resp, next) => {
=======
const authenticate = (req, resp, next) => {
>>>>>>> origin/back_to_begin
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, "+password") //1st
        .then((user) => {
        if (user && user.matches(password)) {
            //2nd
<<<<<<< HEAD
=======
            //gerar o token
            //3rd
>>>>>>> origin/back_to_begin
            const token = jwt.sign({ sub: user.email, iss: "raidscascavel-api" }, environment_1.environment.security.apiSecret);
            resp.json({ name: user.name, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError("Invalid Credentials"));
        }
    })
        .catch(next);
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.handler.js.map