import * as restify from "restify";
import * as jwt from "jsonwebtoken";
import { NotAuthorizedError, NotFoundError } from "restify-errors";
import { User } from "../users/users.model";
import { environment } from "../common/environment";
import * as admin from "firebase-admin";

export const firebaseAuthenticate: restify.RequestHandler = (
  req,
  resp,
  next
) => {
  const { firebaseToken } = req.body;

  admin
    .auth()
    .verifyIdToken(firebaseToken)
    .then((decodedToken) => {
      User.findByFirebaseId(decodedToken.user_id).then((user) => {
        if (user) {
          const token = jwt.sign(
            { sub: user.email, iss: "raidscascavel-api" },
            environment.security.apiSecret
          );

          resp.json({ name: user.name, email: user.email, accessToken: token });
          return next(false);
        } else {
          next(new NotAuthorizedError("Invalid credentials"));
        }
      });
    })
    .catch(next);
};

export const firebaseCreateUser: restify.RequestHandler = (
  req: restify.Request,
  resp: restify.Response,
  next: restify.Next
) => {
  let user = req.body;

  user = new User(user);

  user
    .save()
    .then((value) => resp.json(value))
    .catch(next);
};
