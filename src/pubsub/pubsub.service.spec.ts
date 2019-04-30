import { Test, TestingModule } from '@nestjs/testing';

import { PubSubService } from './pubsub.service';
import { PubSub } from 'graphql-subscriptions';

describe('PubSubService', () => {
  let service: PubSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubSubService],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return PubSub', () => {
    const pubSub = service.getPubSub();
    expect(pubSub instanceof PubSub).toBeTruthy();
  });
});
