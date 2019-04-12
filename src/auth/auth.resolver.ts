import { Args, Resolver, Mutation } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput, RegistrationInput } from './auth.inputs';
import { LoginResponse, RegistrationResponse } from './auth.outputs';

@Resolver()
export class AuthResolver {
  constructor(private readonly authsService: AuthService) {}

  @Mutation(returns => LoginResponse)
  async login(@Args('loginData') loginData: LoginInput) {
    return this.authsService.signIn(loginData);
  }

  @Mutation(returns => RegistrationResponse)
  async register(
    @Args('registrationData') registrationData: RegistrationInput,
  ) {
    return this.authsService.signUp(registrationData);
  }
}
