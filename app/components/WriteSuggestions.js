import AsyncStorage from "@react-native-async-storage/async-storage";

const SUGGESTION_KEY = "@suggestion_key";

const writeSuggestions = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(SUGGESTION_KEY, jsonValue);
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

export default writeSuggestions;
