import { EventEmitter, IEventEmitter } from './entries/eventEmitter';
import { AuthState } from './entries/password';

export interface UIEvents {
  unlock: void;
  copy: string;
  getPassword: AuthState;
  loading: void;
  response: any;
}

export interface IAppSdk {
  copyToClipboard: (value: string, notification?: string) => void;
  openPage: (url: string) => Promise<unknown>;
  disableScroll: () => void;
  enableScroll: () => void;
  getScrollbarWidth: () => number;
  uiEvents: IEventEmitter<UIEvents>;
  version: string;
}

export class MockAppSdk implements IAppSdk {
  copyToClipboard = (value: string, notification?: string) => {
    console.log(value, notification);
  };
  openPage = async (url: string): Promise<void> => {
    console.log(url);
  };
  disableScroll = () => {};
  enableScroll = () => {};
  getScrollbarWidth = () => 0;
  uiEvents = new EventEmitter();
  version = '0.0.0';
}