import { TopStories } from '@modules';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './store';

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <TopStories />
        </View>
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
