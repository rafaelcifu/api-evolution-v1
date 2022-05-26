import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { hash } from 'bcryptjs';
import { UserUpadateDTO } from './userupadate.dto';

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
    const newUser = {
      id: createUser.id,
      name: createUser.name,
      username: createUser.username,
      email: createUser.email,
      created_at: createUser.created_at,
    };
    return newUser;
  }

  // get em todos os usuários
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        created_at: true,
      },
    });
  }

  // get nos usuários que tem posts, incluindo o objeto de posts
  async findAllWithPosts() {
    return await this.prisma.user.findMany({
      include: {
        Posts: true,
      },
    });
  }

  async update(id: string, data: UserUpadateDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new HttpException('User doesnt exists', 400);
    }
    return await this.prisma.user.update({
      data: {
        name: data.name,
        username: data.username,
      },
      where: {
        id,
      },
      select: {
        name: true,
        username: true,
        email: true,
      },
    });
  }
}
