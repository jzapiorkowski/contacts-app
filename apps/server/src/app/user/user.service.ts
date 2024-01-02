import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from '../../constants';
import { UserDocument } from './user.schema';
import { EncryptionService } from '../utils/encryption/encryption.service';
import {
  CreateUserInputDto,
  GetUserInputDto,
  UserOutputDto,
  FindUserByUserNameOrIdInputDto,
  FindUserByUserNameOrIdOutputDto,
  GetUserDataOutputDto,
  GetUsersInputDto,
} from './user.service.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private encryptionService: EncryptionService
  ) {}

  private async getUserByUserNameOrId(
    findUserInputDto: FindUserByUserNameOrIdInputDto
  ): Promise<FindUserByUserNameOrIdOutputDto> {
    try {
      const user = await this.userModel.findOne(findUserInputDto, {
        _id: 1,
        username: 1,
        password: 1,
        roles: 1,
      });

      if (!user) throw new NotFoundException();

      return user;
    } catch {
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findUser({
    username,
    password,
  }: GetUserInputDto): Promise<UserOutputDto> {
    try {
      const user = await this.getUserByUserNameOrId({ username });

      const isPasswordMatching = await this.encryptionService.checkPassword(
        password,
        user.password
      );

      if (!isPasswordMatching) {
        throw new UnauthorizedException('Username or password is incorrect');
      }

      return user;
    } catch {
      throw new InternalServerErrorException('Failed to log in');
    }
  }

  async createUser(createUserDto: CreateUserInputDto): Promise<UserDocument> {
    try {
      createUserDto.password = await this.encryptionService.hashPassword(
        createUserDto.password
      );

      return this.userModel.create(createUserDto);
    } catch {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getUsers(userQuery: GetUsersInputDto): Promise<GetUserDataOutputDto[]> {
    try {
      const users = await this.userModel.find(userQuery, {
        _id: 1,
        username: 1,
        roles: 1,
      });

      return users.map(
        (user) =>
          ({
            _id: user._id.toHexString(),
            username: user.username,
            roles: user.roles,
          } as GetUserDataOutputDto)
      );
    } catch {
      throw new InternalServerErrorException('Failed to get users');
    }
  }
}
