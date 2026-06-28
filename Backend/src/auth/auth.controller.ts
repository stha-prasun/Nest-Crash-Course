import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/registerUser.dto';
import { loginUserDTO } from './dto/loginUser.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() dto: registerUserDto) {
    return await this.authService.registerUser(dto);
  }

  @Post('/login')
  async login(@Body() dto: loginUserDTO) {
    return await this.authService.loginUser(dto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;

    const user = await this.userService.getUserById(userId);

    return user;
  }
}
