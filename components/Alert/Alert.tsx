import { Alert as NativeAlert, HStack, IAlertProps, Text } from 'native-base';
import { StyleSheet } from 'react-native';

type Props = IAlertProps & {
  message: string;
};

export const Alert = ({ message, ...rest }: Props) => {
  return (
    <NativeAlert w="90%" alignSelf={"center"} {...rest}>
      <HStack style={styles.innerContainer}>
        <NativeAlert.Icon style={styles.alertIcon} />
        <Text style={styles.alertMessage}>{message}</Text>
      </HStack>
    </NativeAlert>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    marginHorizontal: 4,
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
    width: "100%",
  },
  alertIcon: {
    marginHorizontal: 10,
  },
  alertMessage: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 16,
  },
});
