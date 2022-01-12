import AsyncStorage from "@react-native-async-storage/async-storage";

const SUGGESTION_KEY = "@suggestion_key";

const readSuggestions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SUGGESTION_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

export default readSuggestions;
