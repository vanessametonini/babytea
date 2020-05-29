import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
require('dotenv').config();


@Injectable()
export class TokenService {

  options = { expiresIn: 86400 * 7 };

  generate(userData) {
    return JWT.sign(userData, process.env.ACCESS_TOKEN_SUPERSECRET, this.options)
  }

  verify(token): Promise<decodedToken> {

    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.ACCESS_TOKEN_SUPERSECRET, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });

  }

}

export type decodedToken = {
  email: string;
  iat: number;
  exp: number;
}
