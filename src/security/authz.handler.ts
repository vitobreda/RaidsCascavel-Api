import * as restify from "restify";
import { ForbiddenError } from "restify-errors";

<<<<<<< HEAD
/* 
    Essa função valida a existencia de um usuario vinculado ao token,
    no caso de não existir é retornado 403
*/
=======
>>>>>>> origin/back_to_begin
export const authorize: (...profiles: string[]) => restify.RequestHandler = (
  ...profiles
) => {
  return (req, resp, next) => {
    if (
      (<any>req).authenticated !== undefined &&
      (<any>req).authenticated.hasAny(...profiles)
    ) {
      next();
    } else {
      next(new ForbiddenError("Permission denied"));
    }
  };
};
