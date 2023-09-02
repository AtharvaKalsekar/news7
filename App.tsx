import 'react-native-gesture-handler';

import { Internet } from '@modules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ColorMode, NativeBaseProvider, StorageManager } from 'native-base';
import { Provider } from 'react-redux';

import { StackNavigation } from './StackNavigation';
import { store } from './store';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      console.log("colorMode =>", value);
      await AsyncStorage.setItem("@color-mode", `${value}`);
    } catch (e) {
      console.log(e);
    }
  },
};

export default function App() {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <Provider store={store}>
        <Internet>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
          <StatusBar style="light" />
        </Internet>
      </Provider>
    </NativeBaseProvider>
  );
}
