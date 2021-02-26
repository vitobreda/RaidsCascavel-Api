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
      authorize("user"),
      this.findAll,
    ]);

    application.get({ path: `${this.basePath}/:id` }, [
      authorize("user"),
      this.validateId,
      this.findById,
    ]);

    application.post({ path: `${this.basePath}` }, this.save);

    application.put({ path: `${this.basePath}/:id` }, [
      authorize("user"),
      this.validateId,
      this.replace,
    ]);

    application.patch({ path: `${this.basePath}/:id` }, [
      authorize("user"),
      this.validateId,
      this.update,
    ]);

    application.del({ path: `${this.basePath}/:id` }, [
      authorize("user"),
      this.validateId,
      this.delete,
    ]);

    application.post(
      { path: `${this.basePath}/several` },
      (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        req.body.forEach((current) => {
          let document = new this.model(current);

          document
            .save()
            .then(() => {
              resp.json({ status: "ok" });
            })
            .catch(next);
        });
      }
    );
  }
}

export const gymsRouter = new GymsRouter();
