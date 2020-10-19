"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const restify = require("restify");
const environment_1 = require("../common/environment");
const mongoose = require("mongoose");
const server_marge_parser_1 = require("./server-marge.parser");
const error_handler_1 = require("./error.handler");
const token_parser_1 = require("../security/token.parser");
const socketio = require("socket.io");
class Server {
    initializeDB() {
        return mongoose.connect(environment_1.environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "raids cascavel api",
                    version: "1.0.0",
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(server_marge_parser_1.mergePatchBodyParser);
                this.application.use(token_parser_1.tokenParser);
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on("restifyError", error_handler_1.handleError);
            }
            catch (error) {
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
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDB().then(() => this.initRoutes(routers).then(() => this.initSocketIo().then(() => this)));
    }
    shutdown() {
        return mongoose.disconnect().then(() => this.application.close());
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map