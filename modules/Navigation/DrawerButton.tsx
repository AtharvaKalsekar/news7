import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDrawerStatus } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export const DrawerButton = () => {
  const { dispatch } = useNavigation();
  const drawerStatus = useDrawerStatus();
  const openDrawer = useCallback(() => {
    if (drawerStatus === "closed") {
      dispatch(DrawerActions.openDrawer());
    }
  }, []);
  return (
    <MaterialCommunityIcons
      style={styles.button}
      name="menu"
      onPress={openDrawer}
      size={30}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    marginRight: 5,
    color: "white",
  },
});
