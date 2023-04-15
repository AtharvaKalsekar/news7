import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveEntry = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export const getEntry = async (key: string) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (error) {}
};

export const saveEntryAsJson = async (key: string, value: Object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

export const getEntryAsJson = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data && JSON.parse(data);
  } catch (error) {}
};

export const deleteEntry = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
