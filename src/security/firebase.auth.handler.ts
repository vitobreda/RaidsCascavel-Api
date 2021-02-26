import * as restify from "restify";
import * as jwt from "jsonwebtoken";
import { NotAuthorizedError } from "restify-errors";
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
        if (User) {
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
      // ...
    })
    .catch(next);
};

export const firebaseCreateUser: restify.RequestHandler = (req, resp, next) => {
  let user = req.body;

  console.log("print User: ", User);

  admin
    .auth()
    .verifyIdToken(user.firebaseToken)
    .then((decodedToken) => {
      user.name = decodedToken.name;
      user.email = decodedToken.email;
      user.firebaseId = decodedToken.user_id;
      delete user.firebaseToken;

      user = new User(user);

      user.save().then((value) => resp.json(value));
      //resp.json(decodedToken);
      // ...
    })
    .catch(next);
};
