import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_CLIENT } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@User() user: CurrentUser, @Token() token: string) {
    // return this.client.send('auth.verify.user', {});
    return {
      user,
      token,
    };
  }
}
