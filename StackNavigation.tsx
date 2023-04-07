import { Article as TArticle } from "@models";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register, VerifyOtp } from "@screens";
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
};

export type StackNavProps = NativeStackNavigationProp<StackNavParamList>;

export const StackNavigation = () => {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  const { token, isEmailVerified } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

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
    <Stack.Navigator>
      {token && isEmailVerified ? (
        <Stack.Screen
          name={Screens.MAIN}
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
      ) : token && !isEmailVerified ? (
        <Stack.Screen
          name={Screens.VERIFY_OTP}
          component={VerifyOtp}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
