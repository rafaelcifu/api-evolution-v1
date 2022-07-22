import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { UserUpadateDTO } from './userupadate.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    description: 'Criar um user, obrigatório: username, email e password',
  })
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Get('/with-posts')
  async findAllWithPosts() {
    return this.userService.findAllWithPosts();
  }
  @Get('/likes-by-user-id/:id')
  async likesByUserId(@Param('id') id: string) {
    return this.userService.likesByUserId(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UserUpadateDTO,
  ): Promise<{ name: string; username: string; email: string }> {
    return this.userService.update(id, data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
