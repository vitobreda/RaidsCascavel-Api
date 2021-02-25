import { Server } from "./src/server/server";
import { usersRouter } from "./src/users/users.router";
import { gymsRouter } from "./src/gyms/gyms.router";

const server = new Server();

server
<<<<<<< HEAD
  .bootstrap([usersRouter, gymsRouter])
=======
  .bootstrap([usersRouter])
>>>>>>> origin/back_to_begin
  .then((server) => {
    console.log("Server is listening on: ", server.application.address());
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
