import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
require('dotenv').config();


@Injectable()
export class TokenService {

  options = { expiresIn: 86400 * 15 };

  generate(userData) {
    return JWT.sign(userData, process.env.ACCESS_TOKEN_SUPERSECRET, this.options)
  }

  verify(token) {

    // JWT.verify(token, process.env.ACCESS_TOKEN_SUPERSECRET)
    //     )
        
    //   if (err) {
    //       throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    //     }

    //     return await this.produtoRepository.find();
    //   },
    // );



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
