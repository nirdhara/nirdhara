import { makeAutoObservable } from 'mobx';
import { RootStore } from './root-store';

export class TestStore {
  root?: RootStore;
  _initState = {
    counter: 0,
  };

  _updateState = this._initState;

  constructor(root?: RootStore) {
    if (root) this.root = root;
    makeAutoObservable(this);
  }

  UpdateCounter = () => {
    this._updateState = { ...this._updateState, counter: this._updateState.counter + 1 };
  };

  resetCounter = () => {
    this._updateState = this._initState;
  };
}
