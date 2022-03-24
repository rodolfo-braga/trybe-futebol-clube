import { JwtPayload, Secret, sign, SignOptions } from 'jsonwebtoken';
import { readFileSync } from 'fs';

const jwtSecret: Secret = readFileSync('./jwt.evaluation.key', 'utf-8');

export default class JwtHandler {
  static generate(email: string) {
    const jwtConfig: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const data: JwtPayload = { email };

    const token: string = sign({ data }, jwtSecret, jwtConfig);

    return token;
  }
}
