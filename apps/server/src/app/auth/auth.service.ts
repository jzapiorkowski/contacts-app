import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from './jwt/jwt.service';
import { TOKEN_EXPIRATION } from '../../constants';
import { ACCESS_TOKEN, EXPIRES_IN } from '@contacts-app/libs';
import { LoginInputDto, LoginOutputDto } from './auth.service.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn({ username, password }: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const user = await this.userService.findUser({
        username,
        password,
      });

      const payload: TokenPayloadDto = {
        sub: user._id.toHexString(),
        username: user.username,
        roles: user.roles,
      };

      return {
        [ACCESS_TOKEN]: await this.jwtService.generateToken(payload),
        [EXPIRES_IN]: TOKEN_EXPIRATION,
      };
    } catch {
      throw new InternalServerErrorException('Failed to log in');
    }
  }
}
