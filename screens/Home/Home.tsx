import { DrawerScreenWrapper, TopStories } from "@modules";
import { Box } from "native-base";
import { StyleSheet } from "react-native";

export const Home = () => {
  return (
    <DrawerScreenWrapper>
      <Box
        style={styles.container}
        _light={{ background: "white" }}
        _dark={{ background: "black" }}
      >
        <TopStories />
      </Box>
    </DrawerScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
