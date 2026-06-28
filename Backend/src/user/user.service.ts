import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registerUserDto } from 'src/auth/dto/registerUser.dto.';
import { User } from './schemas/userEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: registerUserDto) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
}
