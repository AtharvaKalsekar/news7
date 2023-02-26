import Constants from 'expo-constants';

const { manifest } = Constants;

export const getBaseUrl = () => {
  return `http://${manifest?.debuggerHost?.split(":").shift()}:5000`;
};
