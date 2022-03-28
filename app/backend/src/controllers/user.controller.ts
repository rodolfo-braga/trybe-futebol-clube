import { LoginSuccess } from '../interfaces/User';
import UserService from '../services/user.service';
import JwtHandler from '../utils/JwtHandler';

export default class UserController {
  static async login(email: string, password: string): Promise<LoginSuccess> {
    const user = await UserService.getByEmailAndPassword(email, password);
    const token = JwtHandler.generate(email);
    return { user, token } as LoginSuccess;
  }

  static async validate(token: string | undefined): Promise<string> {
    if (!token) throw new Error('Token not found');
    const email = JwtHandler.verify(token);
    const user = await UserService.getByEmail(email);
    return user.role;
  }
}
