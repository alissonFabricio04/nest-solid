import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';

import { PrismaService } from '../../../../prisma.service';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginService {
  async login(loginDto: LoginDto) {
    if (!loginDto.email) throw new Error('email ou senha invalidos');
    if (!loginDto.password) throw new Error('email ou senha invalidos');

    const userExists = await PrismaService.persons.findFirst({
      where: { email: loginDto.email },
    });

    if (!userExists) throw new Error('email ou senha invalidos');

    const passwordIsValid = await compare(
      loginDto.password,
      userExists.password,
    );

    if (!passwordIsValid) throw new Error('email ou senha invalidos');

    return sign(
      { id: userExists.id, cpf: userExists.cpf_cnpj },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
    );
  }
}
