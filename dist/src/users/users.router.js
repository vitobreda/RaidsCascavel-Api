"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const users_model_1 = require("./users.model");
const model_router_1 = require("../common/model-router");
const auth_handler_1 = require("../security/auth.handler");
const authz_handler_1 = require("../security/authz.handler");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on("beforeRender", (document) => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get({ path: `${this.basePath}` }, [
            authz_handler_1.authorize("admin"),
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
        application.post({ path: `${this.basePath}/authenticate` }, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map