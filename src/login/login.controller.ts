import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDTO } from 'src/user/user.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiBody({
    description: 'Para fazer login, username e password ou email e password',
  })
  async login(@Body() data: UserDTO) {
    return this.loginService.login(data);
  }
}
