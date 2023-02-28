import { IAppSdk } from '@tonkeeper/core/dist/AppSdk';
import { EventEmitter } from '@tonkeeper/core/dist/entries/eventEmitter';
import copyToClipboard from 'copy-to-clipboard';
import packageJson from '../../package.json';
import { disableScroll, enableScroll, getScrollbarWidth } from './scroll';

export class BrowserAppSdk implements IAppSdk {
  copyToClipboard = (value: string, notification?: string) => {
    copyToClipboard(value);
    this.uiEvents.emit('copy', {
      method: 'copy',
      params: notification,
    });
  };
  openPage = async (url: string) => {
    window.open(url, '_black');
  };
  disableScroll = disableScroll;
  enableScroll = enableScroll;
  getScrollbarWidth = getScrollbarWidth;
  uiEvents = new EventEmitter();
  version = packageJson.version ?? 'Unknown';
}