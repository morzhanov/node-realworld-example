import { Module } from '@nestjs/common';
import { PubSubService } from './pubsub.service';

@Module({
  providers: [
    {
      provide: PubSubService,
      useValue: new PubSubService(),
    },
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
