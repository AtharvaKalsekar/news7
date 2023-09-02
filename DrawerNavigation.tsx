import { HStack, Text } from '@components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Home } from '@screens';
import { AuthState, logout, RootState, useDeleteAccountMutation } from '@store';
import { AlertDialog, Box, Button, Divider, Icon, Pressable, Switch, useColorMode, useTheme, VStack } from 'native-base';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Screens } from './utils/constants';

const Drawer = createDrawerNavigator();

const ICONS: Partial<{ [key in Screens]: string | undefined }> = {
  [Screens.HOME]: "home",
};

const DrawerContent = (props: any) => {
  const dispatch = useDispatch();

  const { email, name, token } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  const [deleteAccount, { isError, isLoading, isSuccess }] =
    useDeleteAccountMutation();

  const { setColorMode, colorMode } = useColorMode();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const onPressLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const onDelete = useCallback(async () => {
    await deleteAccount({
      token,
    }).unwrap();
  }, []);

  const cancelRef = useRef(null);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onThemeToggle = useCallback((value: boolean) => {
    setColorMode(value ? "dark" : "light");
    // toggleColorMode();
  }, []);

  return (
    <Box _dark={{ bg: "gray.900" }} _light={{ bg: "white" }} flex={1}>
      <DrawerContentScrollView {...props} safeArea>
        <VStack space="6" my="2" mx="1">
          <HStack>
            <Box w={"3/4"} paddingLeft={4} flexWrap={"wrap"}>
              <Text bold color="gray.700" fontSize={"lg"}>
                {name}{" "}
              </Text>
              <Text fontSize="xs" mt="1" color="gray.300" fontWeight="hairline">
                {`${email}`}{" "}
              </Text>
            </Box>
            <Box
              marginLeft={"5"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Pressable onPress={onPressLogout}>
                <Icon
                  size="lg"
                  as={<MaterialCommunityIcons name={"logout"} />}
                />
              </Pressable>
            </Box>
          </HStack>
          <Divider />
          <VStack space="4" height={"full"}>
            <VStack space="3">
              {props.state.routeNames.map((name: Screens, index: number) => (
                <Pressable
                  px="5"
                  py="3"
                  rounded="md"
                  _light={{
                    bg:
                      index === props.state.index
                        ? "orange.100"
                        : "transparent",
                  }}
                  _dark={{
                    bg:
                      index === props.state.index ? "gray.600" : "transparent",
                  }}
                  onPress={(event) => {
                    props.navigation.navigate(name);
                  }}
                  key={name}
                >
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index ? "orange.400" : "gray.500"
                      }
                      size="5"
                      //@ts-ignore
                      as={<MaterialCommunityIcons name={ICONS[name]} />}
                    />
                    <Text
                      fontWeight="bold"
                      fontSize={"md"}
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
      <VStack space="5">
        <Pressable px="5" py="3" onPress={() => setIsOpen(true)}>
          <HStack space="7" alignItems="center" width={"full"}>
            <Icon
              size="5"
              as={<MaterialCommunityIcons name={"theme-light-dark"} />}
              color={"yellow.500"}
            />
            <Text fontWeight="bold" color={"red.500"} fontSize={"md"}>
              {"Dark mode "}{" "}
            </Text>
            <Switch
              colorScheme={"orange"}
              onValueChange={onThemeToggle}
              size={"md"}
              marginLeft={"7"}
              defaultIsChecked={colorMode === "dark"}
            />
          </HStack>
        </Pressable>
      </VStack>
      <Divider />
      <VStack space="5">
        <Pressable px="5" py="3" onPress={() => setIsOpen(true)}>
          <HStack space="7" alignItems="center">
            <Icon
              size="5"
              as={<MaterialCommunityIcons name={"delete"} />}
              color={"red.500"}
            />
            <Text fontWeight="bold" color={"red.500"} fontSize={"md"}>
              {"Delete Account "}{" "}
            </Text>
          </HStack>
        </Pressable>
      </VStack>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content
          _light={{
            bg: "white",
          }}
          _dark={{
            bg: "gray.600",
          }}
        >
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to {name}. This action cannot be
            reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
                _dark={{
                  _text: {
                    color: "white",
                  },
                }}
              >
                {"Cancel "}
              </Button>
              <Button colorScheme="danger" onPress={onDelete}>
                {"Delete "}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export const DrawerNavigation = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

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
