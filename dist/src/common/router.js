"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    envelope(document) {
        return document;
    }
    envelopeAll(documents, options) {
        return documents;
    }
    render(response, next) {
        // document é o retorno da promise
        return (document) => {
            if (document) {
                this.emit("beforeRender", document);
                response.json(this.envelope(document));
            }
            else {
                throw new restify_errors_1.NotFoundError();
            }
            return next();
        };
    }
    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit("beforeRender", document);
                    array[index] = this.envelope(document);
                });
                response.json(this.envelopeAll(documents, options));
            }
            else {
                response.json(this.envelopeAll([], options));
            }
            return next();
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map