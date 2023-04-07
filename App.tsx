import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

import { DrawerNavigation } from "./DrawerNavigation";
import { store } from "./store";

// import { StackNavigation } from "./StackNavigation";
export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          {/* <StackNavigation /> */}
          <DrawerNavigation />
        </NavigationContainer>
        <StatusBar style="light" />
      </Provider>
    </NativeBaseProvider>
  );
}
