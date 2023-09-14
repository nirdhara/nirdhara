import { TestStore } from './test-store';

export class RootStore {
  testStore: TestStore;

  constructor() {
    this.testStore = new TestStore(this);
  }
}
