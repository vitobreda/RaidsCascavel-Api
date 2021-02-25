"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
<<<<<<< HEAD
/*
    Essa função valida a existencia de um usuario vinculado ao token,
    no caso de não existir é retornado 403
*/
exports.authorize = (...profiles) => {
=======
const authorize = (...profiles) => {
>>>>>>> origin/back_to_begin
    return (req, resp, next) => {
        if (req.authenticated !== undefined &&
            req.authenticated.hasAny(...profiles)) {
            next();
        }
        else {
            next(new restify_errors_1.ForbiddenError("Permission denied"));
        }
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authz.handler.js.map