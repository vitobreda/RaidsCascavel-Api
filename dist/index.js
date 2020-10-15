"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server/server");
const users_router_1 = require("./src/users/users.router");
const server = new server_1.Server();
server
    .bootstrap([users_router_1.usersRouter])
    .then((server) => {
    console.log("Server is listening on: ", server.application.address());
})
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map