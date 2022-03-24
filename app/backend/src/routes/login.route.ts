import { NextFunction, Request, Response, Router } from 'express';
import loginValidation from '../middlewares/login.validation';
import UserController from '../controllers/user.controller';
import StatusCode from '../enums/StatusCode';

const loginRoute = Router();

loginRoute.post(
  '/',
  loginValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await UserController.login(email, password);
      return res.status(StatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default loginRoute;
