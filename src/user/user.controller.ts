import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    description: 'Criar um usuário, obrigatório: username, email e password',
  })
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
