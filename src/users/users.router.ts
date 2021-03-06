import * as restify from "restify";
import { User } from "./users.model";
import { ModelRouter } from "../common/model-router";
import { authenticate } from "../security/auth.handler";
import { authorize } from "../security/authz.handler";
import {
  firebaseAuthenticate} from "../security/firebase.auth.handler";

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User);
    this.on("beforeRender", (document) => {
      document.password = undefined;
    });
  }

  applyRoutes(application: restify.Server) {
    application.get({ path: `${this.basePath}` }, [
      authorize("user"),
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

    application.post({ path: `${this.basePath}/authenticate` }, authenticate);

    application.post(
      { path: `${this.basePath}/firebaseAuthenticate` },
      firebaseAuthenticate
    );
  }
}

export const usersRouter = new UsersRouter();
