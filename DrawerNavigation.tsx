import { HStack, Text } from "@components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Home } from "@screens";
import { AuthState, logout, RootState } from "@store";
import {
  Box,
  Divider,
  Icon,
  Pressable,
  useColorMode,
  useTheme,
  VStack,
} from "native-base";
import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Screens } from "./utils/constants";

const Drawer = createDrawerNavigator();

const ICONS: Partial<{ [key in Screens]: string | undefined }> = {
  [Screens.HOME]: "home",
};

const DrawerContent = (props: any) => {
  const dispatch = useDispatch();

  const { email, name } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  const onPressLogout = useCallback(() => {
    dispatch(logout());
  }, []);
  return (
    <>
      <DrawerContentScrollView {...props} safeArea>
        <VStack space="6" my="2" mx="1">
          <Box px="4">
            <Text bold color="gray.700">
              {name}
            </Text>
            <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
              {email}
            </Text>
          </Box>
          <Divider />
          <VStack space="4" height={"full"}>
            <VStack space="3">
              {props.state.routeNames.map((name: Screens, index: number) => (
                <Pressable
                  px="5"
                  py="3"
                  rounded="md"
                  bg={
                    index === props.state.index
                      ? "rgba(6, 182, 212, 0.1)"
                      : "transparent"
                  }
                  onPress={(event) => {
                    props.navigation.navigate(name);
                  }}
                  key={name}
                >
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index ? "primary.500" : "gray.500"
                      }
                      size="5"
                      //@ts-ignore
                      as={<MaterialCommunityIcons name={ICONS[name]} />}
                    />
                    <Text
                      fontWeight="500"
                      color={
                        index === props.state.index ? "primary.500" : "gray.700"
                      }
                    >
                      {name}{" "}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
      <Divider />
      <VStack space="5">
        <Pressable px="5" py="3" onPress={onPressLogout}>
          <HStack space="7" alignItems="center">
            <Icon size="5" as={<MaterialCommunityIcons name={"logout"} />} />
            <Text fontWeight="500">{"Logout "}</Text>
          </HStack>
        </Pressable>
      </VStack>
    </>
  );
};

export const DrawerNavigation = () => {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Drawer.Navigator
      id="drawer-nav"
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
        drawerActiveBackgroundColor: colors.orange[600],
        headerLeft: () => <></>,
      }}
      initialRouteName={Screens.HOME}
      drawerContent={(props) => <DrawerContent {...props} />}
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
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
