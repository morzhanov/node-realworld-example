import { Args, Resolver, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UploadService } from './upload.service';
import { GqlAuthGuard } from '../auth/gql.auth.guard';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(new GqlAuthGuard('jwt'))
  @Mutation(returns => String)
  async signUrl(
    @Args('filename') filename: string,
    @Args('mimetype') mimetype: string,
    @Context() ctx: any,
  ) {
    return this.uploadService.createSignedUrl(filename, mimetype, ctx.user.id);
  }
}
