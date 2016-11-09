/**
 * Created by  Layman(https://github.com/anysome) on 2016/11/9.
 */
import I18n from 'react-native-i18n';
import moment from 'moment';
require('moment/locale/zh-cn');
// import MobclickAgent from 'rn-umeng';

import config from './config.json';
import api from './api.json';
import airloy, {configure, use} from 'airloy/src';
import airloyReactNative from 'airloy-react-native';
import {colors, styles} from './views/styles';

configure(config.airloy);
use(airloyReactNative);

// import toast from './widgets/Toast';
// import ActivityIndicator from './widgets/ActivityIndicator';

console.log('locale = ' + I18n.locale);

// // analytics
// MobclickAgent.startWithAppkey(config.keys.umeng);
// MobclickAgent.setDebugMode(true);
// MobclickAgent.getDeviceInfo(info => {
//   console.log(JSON.stringify(info));
// });

// init
I18n.fallbacks = true;
I18n.missingTranslationPrefix = '';
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'en';//'zh-CN';
I18n.translations = require('./langs');

moment.locale('zh-cn');


function L(message, options) {
  return I18n.translate(message, options);
}

function hang(upOrType = true) {
  if(upOrType) {
    ActivityIndicator.show(typeof(upOrType) === 'string' ? upOrType : 'Wave');
  } else {
    ActivityIndicator.hide();
  }
}
function toast(message) {
  console.log('todo: toast ' + message);
}


let MobclickAgent = {};
export { MobclickAgent as analytics, config, styles, colors, airloy, api, L, toast, hang};