import * as restify from "restify";

export const handleError = (
  req: restify.Request,
  res: restify.Response,
  err: any,
  callback: any
) => {
  switch (err.name) {
    case "MongoError":
      if (err.code === 11000) {
        err.statusCode = 400;
      }
      break;
    case "ValidationError":
      err.statusCode = 400;
      break;
  }

  return callback();
};
