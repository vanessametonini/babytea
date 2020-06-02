import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import path = require('path');

@Injectable()
export class FrontendMiddleware implements NestMiddleware {

  private allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];

  resolvePath(file: string) {
    return path.resolve(`../client/dist/babytea/${file}`);
  }

  use(req: Request, res: Response, next: Function) {

    const { url } = req;
    
    if (this.allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      res.sendFile(this.resolvePath(url));
    } else {
      res.sendFile(this.resolvePath('index.html'));
    }

    next();
  }

}
