import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './entities/userEntity';
import { Repository } from 'typeorm';
import { loginUserDTO } from 'src/auth/dto/loginUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: registerUserDto) {
    const existing = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) throw new ConflictException('Email already registered');

    const user = this.userRepository.create({
      fname: dto.fname,
      lname: dto.lname,
      email: dto.email,
      password: dto.password,
    });

    await this.userRepository.save(user);

    return user;
  }

  async loginUser(dto: loginUserDTO) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }
}
