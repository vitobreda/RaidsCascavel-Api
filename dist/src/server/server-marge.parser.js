"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePatchBodyParser = void 0;
const restify_errors_1 = require("restify-errors");
const mpContentType = "application/marge-patch+json";
<<<<<<< HEAD
/*
    essa função tem como objetivo recebeer requisições do tipo path
    quando é enviado no header o parametro contentType igual a
    application/marge-patch+json de forma a seguir as especificações
    do padrão restful
*/
exports.mergePatchBodyParser = (req, resp, next) => {
=======
const mergePatchBodyParser = (req, resp, next) => {
>>>>>>> origin/back_to_begin
    if (req.contentType() === mpContentType && req.method === "PATCH") {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new restify_errors_1.BadRequestError(`Invalid content: ${e.message}`));
        }
    }
    return next();
};
exports.mergePatchBodyParser = mergePatchBodyParser;
//# sourceMappingURL=server-marge.parser.js.map