import { NextFunction, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import JwtHandler from '../utils/JwtHandler';
import ErrorMessage from '../enums/ErrorMessage';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: ErrorMessage.TOKEN_NOT_FOUND });
  }

  try {
    JwtHandler.verify(token);
    next();
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: ErrorMessage.INVALID_TOKEN });
  }
};

export default tokenValidation;
