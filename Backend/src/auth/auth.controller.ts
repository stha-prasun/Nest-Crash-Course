import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto/registerUser.dto';
import { loginUserDTO } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: registerUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('/login')
  login(@Body() dto: loginUserDTO) {
    return this.authService.loginUser(dto);
  }
}
