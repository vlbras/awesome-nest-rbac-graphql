import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token/token.service';
import { Auth, SignInInput, SignUpInput } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<Auth> {
    const { id, role } = await this.userService.create(signUpInput);
    const { accessToken, refreshToken } = await this.tokenService.generate({ id, role });

    return { accessToken, refreshToken };
  }

  async signIn(signInInput: SignInInput): Promise<Auth> {
    const { id, role, password } = await this.userService.findOne(
      { email: signInInput.email },
    );
    const isPasswordValid = await verify(password, signInInput.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const { accessToken, refreshToken } = await this.tokenService.generate({ id, role });

    return { accessToken, refreshToken };
  }

  logOut(userId: string): void {
    this.userService.update({ id: userId}, { token: null });
  }

  async refreshTokens(userId: string, token: string): Promise<Auth> {
    const { token: hashedToken, role } = await this.userService.findOne({ id: userId });

    if (!hashedToken) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const isRefreshTokenValid = await verify(hashedToken, token);

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const { accessToken, refreshToken } = await this.tokenService.generate({ id: userId, role });
    
    return { accessToken, refreshToken };
  }
}