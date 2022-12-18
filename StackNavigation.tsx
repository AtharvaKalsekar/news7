import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens';
import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  const { colors } = useTheme();

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
          contentStyle: styles.container,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 5,
  },
});
