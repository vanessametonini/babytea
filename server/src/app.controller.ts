import { Controller, Get, Res } from '@nestjs/common';
import path = require('path');

@Controller()
export class AppController {
  @Get()
  root(@Res() response): void {
    response.sendFile(path.join(__dirname,'public/index.html'));
  }
}
