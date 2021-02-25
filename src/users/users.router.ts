import * as restify from "restify";
import { User } from "./users.model";
import { ModelRouter } from "../common/model-router";
import { authenticate } from "../security/auth.handler";
import { authorize } from "../security/authz.handler";

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User);
    this.on("beforeRender", (document) => {
      document.password = undefined;
    });
  }

  applyRoutes(application: restify.Server) {
    application.get({ path: `${this.basePath}` }, [
<<<<<<< HEAD
      authorize("user", "admin"),
=======
      authorize("admin"),
>>>>>>> origin/back_to_begin
      this.findAll,
    ]);

    application.get({ path: `${this.basePath}/:id` }, [
      authorize("user", "admin"),
      this.validateId,
      this.findById,
    ]);

    application.post({ path: `${this.basePath}` }, [
      authorize("user", "admin"),
      this.save,
    ]);

    application.put({ path: `${this.basePath}/:id` }, [
      authorize("user", "admin"),
      this.validateId,
      this.replace,
    ]);

    application.patch({ path: `${this.basePath}/:id` }, [
      authorize("user", "admin"),
      this.validateId,
      this.update,
    ]);

    application.del({ path: `${this.basePath}/:id` }, [
      authorize("user", "admin"),
      this.validateId,
      this.delete,
    ]);

    application.post({ path: `${this.basePath}/authenticate` }, authenticate);
  }
}

export const usersRouter = new UsersRouter();
