"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gymsRouter = void 0;
const gyms_model_1 = require("./gyms.model");
const model_router_1 = require("../common/model-router");
const authz_handler_1 = require("../security/authz.handler");
class GymsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(gyms_model_1.Gym);
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}` }, [
            authz_handler_1.authorize("user", "admin"),
            this.findAll,
        ]);
        application.get({ path: `${this.basePath}/:id` }, [
            this.validateId,
            this.findById,
        ]);
        application.post({ path: `${this.basePath}` }, this.save);
        application.put({ path: `${this.basePath}/:id` }, [
            this.validateId,
            this.replace,
        ]);
        application.patch({ path: `${this.basePath}/:id` }, [
            this.validateId,
            this.update,
        ]);
        application.del({ path: `${this.basePath}/:id` }, [
            this.validateId,
            this.delete,
        ]);
    }
}
exports.gymsRouter = new GymsRouter();
//# sourceMappingURL=gyms.router.js.map