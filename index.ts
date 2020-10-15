import { Server } from "./src/server/server";
import { usersRouter } from "./src/users/users.router";

const server = new Server();

server
    .bootstrap([usersRouter])
    .then((server) => {
        console.log("Server is listening on: ", server.application.address());
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
