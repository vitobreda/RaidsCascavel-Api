import * as restify from "restify";
import { environment } from "../common/environment";
import { Router } from "../common/router";
import * as mongoose from "mongoose";
import * as admin from "firebase-admin";
import { mergePatchBodyParser } from "./server-marge.parser";
import { handleError } from "./error.handler";
import { tokenParser } from "../security/token.parser";
import { resolve } from "path";
import { rejects } from "assert";
var serviceAccount = require("C:/Projetos/RaidsCascavel-Api/src/google.services/raidscascavel-firebase-adminsdk-sne2u-15731f0629.json");

export class Server {
  application: restify.Server;

  initializeDB() {
    return mongoose.connect(environment.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }

  initializeFirebase() {
    return new Promise((resolve, reject) => {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://raidscascavel-default-rtdb.firebaseio.com",
        });

        resolve(this.application);
      } catch (error) {
        reject(error);
      }
    });
  }

  initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "raids cascavel api",
          version: "1.0.0",
        });

        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);
        this.application.use(tokenParser);

        //routes
        for (let router of routers) {
          router.applyRoutes(this.application);
        }

        this.application.listen(environment.server.port, () => {
          resolve(this.application);
        });

        this.application.on("restifyError", handleError);
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initializeDB().then(() =>
      this.initializeFirebase().then(() =>
        this.initRoutes(routers).then(() => this)
      )
    );
  }

  shutdown() {
    return mongoose.disconnect().then(() => this.application.close());
  }
}
