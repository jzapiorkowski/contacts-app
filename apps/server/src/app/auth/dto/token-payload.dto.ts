import { ROLE } from '@contacts-app/libs';

export class TokenPayloadDto {
  sub: string;
  username: string;
  roles: ROLE[];
}
