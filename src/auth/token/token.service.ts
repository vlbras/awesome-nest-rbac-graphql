import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { UserService } from 'src/user/user.service';
import { jwtConfig } from './jwt.config';
import { Auth } from '../dto';
import { JwtPayload } from 'src/lib/interfaces';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generate(payload: JwtPayload): Promise<Auth> {
    const [accessToken, refreshToken] = await Promise.all([
      this.sign(payload, jwtConfig.accessSecret, jwtConfig.accessTTL),
      this.sign(payload, jwtConfig.refreshSecret, jwtConfig.refreshTTL),
    ]);
    const hashedToken = await hash(refreshToken);
    await this.userService.update({ id: payload.id }, { token: hashedToken });

    return { accessToken, refreshToken };
  }

  private async sign(
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
    });
  }
}
