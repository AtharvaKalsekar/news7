import { TopStories } from '@modules';
import { Box } from 'native-base';
import { StyleSheet } from 'react-native';

export const Home = () => {
  return (
    <Box
      style={styles.container}
      _light={{ background: "white" }}
      _dark={{ background: "black" }}
    >
      <TopStories />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
