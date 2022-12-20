import { Article as TArticle } from '@models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Article, Home, Register, Screens } from '@screens';
import { Switch, useColorMode, useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

type StackNavParamList = {
  [Screens.HOME]: {};
  [Screens.ARTICLE]: TArticle;
};

export type StackNavProps = NativeStackNavigationProp<StackNavParamList>;

export const StackNavigation = () => {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.REGISTER}
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screens.HOME}
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: colors.orange[600],
          },
          headerTitle: "News71",
          headerTintColor: "white",
          contentStyle: {
            ...styles.container,
            backgroundColor: colorMode === "dark" ? "black" : "white",
            paddingTop: 5,
          },
          headerRight: (props) => {
            const onChange = () => {
              toggleColorMode();
            };
            return (
              <Switch
                size={"md"}
                onChange={onChange}
                offTrackColor={"white"}
                onTrackColor={"black"}
                thumbColor={"lightgray"}
              />
            );
          },
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
          contentStyle: {
            ...styles.container,
            backgroundColor: colorMode === "dark" ? "black" : "white",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
