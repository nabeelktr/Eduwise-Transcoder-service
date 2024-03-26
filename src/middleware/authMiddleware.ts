import { NextFunction, Response } from "express";
import { AuthClient } from "../config/grpc-client/auth.client";
import { CustomRequest } from "../interfaces/iRequest";

export const isValidated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;
  AuthClient.IsAuthenticated({ token }, (err, result) => {
    if (err) {
      res.status(401).json({ success: false, message: err });
    } else {
      req.userId = result?.userId;
      req.role = result?.role;
      next();
    }
  });
};
