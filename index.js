/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// 🔹 Background Notification Handler
messaging().setBackgroundMessageHandler((remoteMessage) => console.log(remoteMessage));

AppRegistry.registerComponent(appName, () => App);
