import { LoginSuccess } from '../interfaces/User';
import UserService from '../services/user.service';
import JwtHandler from '../utils/JwtHandler';

export default class UserController {
  static async login(email: string, password: string): Promise<LoginSuccess> {
    const user = await UserService.getByEmailAndPassword(email, password);
    const token = JwtHandler.generate(email);
    return { user, token } as LoginSuccess;
  }
}
