import { Article as TArticle } from "@models";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Article,
  CheckEmailExists,
  Login,
  Register,
  SetNewPassword,
  VerifyOtp,
} from "@screens";
import { AuthState, RootState, setAuthState } from "@store";
import { useColorMode, useTheme } from "native-base";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { DrawerNavigation } from "./DrawerNavigation";
import { getEntryAsJson } from "./utils/AsyncStorage";
import { Screens } from "./utils/constants";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

type StackNavParamList = {
  [Screens.HOME]: undefined;
  [Screens.ARTICLE]: TArticle;
  [Screens.LOGIN]: undefined;
  [Screens.REGISTER]: undefined;
  [Screens.VERIFY_OTP]: undefined;
  [Screens.MAIN]: any;
  [Screens.CHECK_EMIAL_EXISTS]: undefined;
  [Screens.SET_NEW_PASSWORD]: undefined;
};

export type StackNavProps = NativeStackNavigationProp<StackNavParamList>;

export const StackNavigation = () => {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  const { token, isEmailVerified, isPasswordReset } = useSelector<
    RootState,
    AuthState
  >((state) => state.auth);

  const dispath = useDispatch();

  useEffect(() => {
    const initStore = async () => {
      const data = await getEntryAsJson("userData");
      const storedToken = data?.token;
      if (storedToken) {
        dispath(setAuthState(data));
      }
    };
    if (!token) {
      initStore();
    }
  }, [token]);

  return (
    <Stack.Navigator initialRouteName={Screens.MAIN} id="root-nav">
      {token && isEmailVerified && !isPasswordReset ? (
        <Stack.Group>
          <Stack.Screen
            name={Screens.MAIN}
            component={DrawerNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.ARTICLE}
            component={Article}
            options={{
              headerStyle: {
                backgroundColor: colors.orange[600],
              },
              headerTitle: "Article",
              headerTintColor: "white",
            }}
          />
        </Stack.Group>
      ) : (
        // : token && !isEmailVerified ? (
        //   <Stack.Screen
        //     name={Screens.VERIFY_OTP}
        //     component={VerifyOtp}
        //     options={{
        //       headerShown: false,
        //     }}
        //   />
        // )
        <Stack.Group>
          <Stack.Screen
            name={Screens.REGISTER}
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.LOGIN}
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.VERIFY_OTP}
            component={VerifyOtp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.CHECK_EMIAL_EXISTS}
            component={CheckEmailExists}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Screens.SET_NEW_PASSWORD}
            component={SetNewPassword}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
