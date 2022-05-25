import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDTO } from 'src/login/login.dto';
import { UserDTO } from 'src/user/user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiBody({
    description:
      'Para fazer login, utilize email e password (ou username e password)',
  })
  async login(@Body() data: LoginDTO) {
    return this.loginService.login(data);
  }
}
