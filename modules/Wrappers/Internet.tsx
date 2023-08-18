import { getNetworkStateAsync } from 'expo-network';
import { Button, Center, Image, Text, useTheme } from 'native-base';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Linking } from 'react-native';

type Props = {
  children: ReactElement | ReactElement[];
};

export const Internet = ({ children }: Props) => {
  const [isInternetAvailable, setIsInternetAvailable] = useState(false);
  const [isSetteled, setIsSettled] = useState(false);
  const [checking, setChecking] = useState(false);

  const [unableToOpenSettings, setUnableToOpenSettings] = useState(false);

  const { colors } = useTheme();

  const onPressOpenSettings = useCallback(async () => {
    try {
      await Linking.sendIntent("android.settings.WIRELESS_SETTINGS");
      setUnableToOpenSettings(false);
    } catch (error) {
      setUnableToOpenSettings(true);
    }
  }, []);

  useEffect(() => {
    const checkInternet = async () => {
      try {
        setChecking(true);
        const networkState = await getNetworkStateAsync();
        if (networkState.isConnected && networkState.isInternetReachable) {
          setIsInternetAvailable(true);
        }
      } catch (err) {
        setIsInternetAvailable(false);
      } finally {
        setChecking(false);
        setIsSettled(true);
      }
    };
    if (!isSetteled) {
      checkInternet();
    }
  }, [isSetteled]);

  const internetAvailable = isSetteled && isInternetAvailable;
  const checkingInProgress = !isSetteled && checking;

  const onPressCheckAgain = useCallback(() => {
    setIsSettled(false);
  }, []);

  return (
    <>
      {internetAvailable && children}
      {checkingInProgress && (
        <Center h="full" w="full">
          <ActivityIndicator size={50} color={colors.orange[600]} />
          <Text> Checking internet connection ... </Text>
        </Center>
      )}
      {!internetAvailable && (
        <Center h="full" w="full">
          <Image
            source={require("../../assets/no-signal.png")}
            display={"flex"}
            width={"40"}
            height={"40"}
            ml={"10"}
            my={"5"}
            alignItems={"center"}
            style={{
              objectFit: "contain",
            }}
          />
          <Button
            colorScheme={"orange"}
            onPress={onPressOpenSettings}
            w={"1/3"}
          >
            Open settings
          </Button>
          <Button
            variant={"outline"}
            colorScheme={"orange"}
            onPress={onPressCheckAgain}
            marginY={"2"}
            w={"1/3"}
          >
            Check again
          </Button>
        </Center>
      )}
    </>
  );
};
