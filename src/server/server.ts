import * as restify from "restify";
import { environment } from "../common/environment";
import { Router } from "../common/router";
import * as mongoose from "mongoose";
import { mergePatchBodyParser } from "./server-marge.parser";
import { handleError } from "./error.handler";
import { tokenParser } from "../security/token.parser";
import * as socketio from "socket.io";

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

  initSocketIo() {
    return new Promise((resolve, reject) => {
      var io = socketio.listen(this.application.server);

      try {
        io.sockets.on("connection", function (socket) {
          socket.emit("news", { hello: "world" });
          socket.on("my other event", function (data) {
            console.log(data);
          });

          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initializeDB().then(() =>
      this.initRoutes(routers).then(() => this.initSocketIo().then(() => this))
    );
  }

  shutdown() {
    return mongoose.disconnect().then(() => this.application.close());
  }
}
