import { PubSub } from 'graphql-subscriptions';

export class PubSubService {
  private readonly pubSub: PubSub;

  constructor() {
    this.pubSub = new PubSub();
  }

  public getPubSub(): PubSub {
    return this.pubSub;
  }
}
