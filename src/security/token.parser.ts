import * as restify from "restify";
import * as jwt from "jsonwebtoken";
import { User } from "../users/users.model";
import { environment } from "../common/environment";

/*
  Esse conjunto de função tem como objetivo remover o token da requisição
  validar e buscar o usuario vinculado ao token em um novo parametro da
  requisição.
*/
export const tokenParser: restify.RequestHandler = (req, resp, next) => {
  const token = extractToken(req);
  if (token) {
    jwt.verify(token, environment.security.apiSecret, applyBearer(req, next));
  } else {
    next();
  }
};

function extractToken(req: restify.Request) {
  //Authorization: Bearer TOKEN
  let token = undefined;
  const authorization = req.header("authorization");
  if (authorization) {
    const parts: string[] = authorization.split(" ");
<<<<<<< HEAD

=======
>>>>>>> origin/back_to_begin
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }
  return token;
}

function applyBearer(req: restify.Request, next): (error, decoded) => void {
  return (error, decoded) => {
    if (decoded) {
      User.findByEmail(decoded.sub)
        .then((user) => {
          if (user) {
            //associar o usuário no request
<<<<<<< HEAD
            (<any>req).authenticated = user;
=======
            (<any>req).authenticated = user; //
>>>>>>> origin/back_to_begin
          }
          next();
        })
        .catch(next);
    } else {
      next();
    }
  };
}
