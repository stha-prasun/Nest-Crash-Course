import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerUserDto } from './dto/registerUser.dto.';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async regsiterUser(dto: registerUserDto) {

    const hashedPassword = await bcrypt.hash(dto.password, 10);


    const user = await this.userService.createUser({
            ...dto,
            password: hashedPassword,
        });
  }
}
