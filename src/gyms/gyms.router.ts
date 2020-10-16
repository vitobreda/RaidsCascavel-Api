import * as restify from "restify";
import { Gym } from "./gyms.model";
import { ModelRouter } from "../common/model-router";
import { authenticate } from "../security/auth.handler";
import { authorize } from "../security/authz.handler";

class GymsRouter extends ModelRouter<Gym> {
  constructor() {
    super(Gym);
  }

  applyRoutes(application: restify.Server) {
    application.get({ path: `${this.basePath}` }, [
      authorize("user", "admin"),
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

export const gymsRouter = new GymsRouter();
