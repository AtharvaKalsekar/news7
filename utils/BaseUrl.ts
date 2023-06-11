//@ts-ignore
// import { ENVIRONMENT } from "@env";
import Constants from 'expo-constants';

const { manifest } = Constants;

export const getBaseUrl = () => {
  const ENVIRONMENT = Constants.expoConfig?.extra?.environment;
  if (ENVIRONMENT === "dev") {
    return `http://${manifest?.debuggerHost?.split(":").shift()}:5000`;
  } else if (ENVIRONMENT === "prod") {
    return "https://news71-0.onrender.com";
  }
};
