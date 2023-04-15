import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

import { StackNavigation } from "./StackNavigation";
import { store } from "./store";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
        <StatusBar style="light" />
      </Provider>
    </NativeBaseProvider>
  );
}
