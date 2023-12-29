import { IsNotEmpty, IsString } from 'class-validator';
import { SignInDto as SignInDtoInterface } from '@contacts-app/libs';

export class SignInDto implements SignInDtoInterface {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
