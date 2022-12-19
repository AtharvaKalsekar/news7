import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens';
import { Switch, useColorMode, useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
});
