import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginUserDTO } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: registerUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    if (!user) {
      throw new InternalServerErrorException('Failed to register user');
    }

    return { message: 'User registered successfully' };
  }

  async loginUser(dto: loginUserDTO) {
    const user = await this.userService.loginUser(dto);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
