import { registerRootComponent } from 'expo';
import App from './App';
import {Text, TextInput} from 'react-native';

registerRootComponent(App);

if (Text.defaultProps == null) {
    Text.defaultProps = TextInput.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
}
