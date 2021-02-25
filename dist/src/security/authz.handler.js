"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
const authorize = (...profiles) => {
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