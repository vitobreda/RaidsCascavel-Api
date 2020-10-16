import * as restify from "restify";
import { Gym } from "./gyms.model";
import { ModelRouter } from "../common/model-router";
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

    application.post(
      { path: `${this.basePath}/several` },
      (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        for (let current in req.body) {
          let document = new this.model(req.body[current]);

          document.save().catch(next);
        }

        resp.json({ status: "ok" });
        next();
      }
    );
  }
}

export const gymsRouter = new GymsRouter();
