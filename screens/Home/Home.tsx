import { TopStories } from '@modules';
import { StyleSheet, View } from 'react-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <TopStories />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
