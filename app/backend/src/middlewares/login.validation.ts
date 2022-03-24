import { NextFunction, Request, Response } from 'express';
import loginSchema from '../schemas/login';

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(error);
  next();
};

export default loginValidation;
