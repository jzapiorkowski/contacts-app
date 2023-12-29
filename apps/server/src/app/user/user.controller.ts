import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/guards/roles/role.decorator';
import {
  CreateUserRequestDto,
  ROLE,
  UserResponseDto,
} from '@authorization-app/libs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getUsers({});
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Body() createUserDto: CreateUserRequestDto) {
    if (!createUserDto.username) {
      throw new BadRequestException('Username is required in the request.');
    }

    if (!createUserDto.password) {
      throw new BadRequestException('Password is required in the request.');
    }

    await this.userService.createUser({
      ...createUserDto,
      roles: [...createUserDto.roles, ROLE.USER],
    });

    return { message: 'success' };
  }
}
