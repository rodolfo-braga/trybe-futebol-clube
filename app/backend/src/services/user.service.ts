import * as bcrypt from 'bcryptjs';
import ErrorMessage from '../enums/ErrorMessage';
import User from '../database/models/User';
import { IUser } from '../interfaces/User';

export default class UserService {
  static verifyPassword(password: string, hash: string) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    if (!isPasswordValid) throw new Error(ErrorMessage.INVALID_INPUT);
  }

  static async getByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const user = await User.findOne(
      { where: { email }, raw: true },
    );

    if (!user) throw new Error(ErrorMessage.INVALID_INPUT);

    UserService.verifyPassword(password, user.password);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    } as IUser;
  }

  static async getByEmail(email: string): Promise<IUser> {
    const user = await User.findOne(
      { where: { email }, raw: true },
    );

    if (!user) throw new Error(ErrorMessage.INVALID_INPUT);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    } as IUser;
  }
}
