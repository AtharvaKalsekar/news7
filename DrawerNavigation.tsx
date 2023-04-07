import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "@screens";
import { useColorMode, useTheme } from "native-base";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Screens } from "./utils/constants";

//@ts-ignore
// global.__reanimatedWorkletInit = () => {};
const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Drawer.Navigator
      screenOptions={{
        sceneContainerStyle: {
          ...styles.container,
          backgroundColor: colorMode === "dark" ? "black" : "white",
        },
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: "white",
          zIndex: 100,
        },
        headerLeft: () => <></>,
      }}
      initialRouteName={Screens.HOME}
    >
      <Drawer.Screen
        name={Screens.HOME}
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: colors.orange[600],
          },
          headerTitle: "News71",
          headerTintColor: "white",
          // headerRight: (props) => {
          //   const onChange = () => {
          //     toggleColorMode();
          //   };
          //   return (
          //     <Switch
          //       size={"md"}
          //       onChange={onChange}
          //       offTrackColor={"white"}
          //       onTrackColor={"black"}
          //       thumbColor={"lightgray"}
          //     />
          //   );
          // },
        }}
      />
      {/* <Drawer.Screen
        name={Screens.ARTICLE}
        component={Article}
        options={{
          headerStyle: {
            backgroundColor: colors.orange[600],
          },
          headerTitle: "Article",
          headerTintColor: "white",
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
