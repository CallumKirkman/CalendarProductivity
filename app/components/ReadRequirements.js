import AsyncStorage from "@react-native-async-storage/async-storage";

const REQUIREMENTS_KEY = "@requirements_key";

const readRequirements = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(REQUIREMENTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

export default readRequirements;
