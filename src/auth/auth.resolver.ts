import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/lib/guards';
import { Public, User, UserID } from 'src/lib/decorators';
import { Auth, SignInInput, SignUpInput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  async signUp(@Args('data') data: SignUpInput): Promise<Auth> {
    return this.authService.signUp(data);
  }

  @Public()
  @Mutation(() => Auth)
  async signIn(@Args('data') data: SignInInput): Promise<Auth> {
    return this.authService.signIn(data);
  }

  @Mutation(() => Boolean, { nullable: true })
  logOut(@UserID() userId: string): void {
    return this.authService.logOut(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => Auth)
  async refreshTokens(
    @UserID() userId: string,
    @User('refreshToken') refreshToken: string,
  ): Promise<Auth> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
