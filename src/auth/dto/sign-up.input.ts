import { InputType } from '@nestjs/graphql';
import { SignInInput } from './sign-in.input';

@InputType()
export class SignUpInput extends SignInInput {}
