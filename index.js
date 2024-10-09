/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler'
import 'react-native-reanimated'
// debugging
// import "react-native-devsettings";
// import "react-native-devsettings/withAsyncStorage";

AppRegistry.registerComponent(appName, () => App);
