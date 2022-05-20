import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // cria novo usuário
  async create(data: UserDTO) {
    const emailAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const usernameAlreadyExists = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (emailAlreadyExists) {
      throw new HttpException('E-mail already exists', 400);
    }

    if (usernameAlreadyExists) {
      throw new HttpException('Username already exists', 400);
    }

    // cria senha encriptada
    const passwordHash = await hash(data.password, 8);
    // define os paametros de criação do usuário
    const createUser = await this.prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: passwordHash,
      },
    });
    return createUser;
  }
  // get em todos os usuários
  async findAll() {
    return await this.prisma.user.findMany();
  }
}
