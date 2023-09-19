import Constants from 'expo-constants';

const { expoConfig } = Constants;

const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT;

export const getBaseUrl = () => {
  if (ENVIRONMENT === "local") {
    // @ts-ignore
    return `http://${expoConfig?.hostUri?.split(":").shift()}:5000`;
  } else if (ENVIRONMENT === "production") {
    return "https://news71-0.onrender.com";
  }
};
