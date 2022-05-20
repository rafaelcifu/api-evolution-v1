import { HttpException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from 'src/user/user.dto';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(data: UserDTO) {
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
      '628a1004-7b2e-4b90-aaf6-679d7bf7d361',
      {
        subject: userAlreadyExists.id,
        expiresIn: '1w',
      },
    );
    const login = {
      id: userAlreadyExists.id,
      email: userAlreadyExists.email,
      usernme: userAlreadyExists.username,
      token: generateToken,
    };
    return login;
  }
}
