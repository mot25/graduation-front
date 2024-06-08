import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import YaMap from 'react-native-yamap';
import { name as appName } from './app.json';
import { App } from './src/App/App';

YaMap.init('c3103c23-bea6-4aa4-a8ad-317ee1eb1f0f');

AppRegistry.registerComponent(appName, () => App);
