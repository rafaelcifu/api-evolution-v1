import { HttpException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/database/PrismaService';
import { LoginDTO } from 'src/login/login.dto';
require('dotenv').config();

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(data: LoginDTO) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (!userAlreadyExists) {
      throw new HttpException('User or password invalid', 400);
    }
    const passwordMath = await compare(
      data.password,
      userAlreadyExists.password,
    );

    if (!passwordMath) {
      throw new HttpException('User or password invalid', 400);
    }

    const generateToken = sign(
      {
        email: userAlreadyExists.email,
      },
      process.env.JWT_TOKEN,
      {
        subject: userAlreadyExists.id,
        expiresIn: '1w',
      },
    );
    const login = {
      id: userAlreadyExists.id,
      email: userAlreadyExists.email,
      username: userAlreadyExists.username,
      token: generateToken,
    };
    return login;
  }
}
