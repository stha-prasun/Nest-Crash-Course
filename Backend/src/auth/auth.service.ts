import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerUserDto } from './dto/registerUser.dto.';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async regsiterUser(dto: registerUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.userService.createUser({
        ...dto,
        password: hashedPassword,
      });

      if (!user) {
        throw new InternalServerErrorException('Failed to register user');
      }

      return { message: 'User registered successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
