import AsyncStorage from "@react-native-async-storage/async-storage";

const DEADLINES_KEY = "@deadlines_key";

const readDeadlines = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DEADLINES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

export default readDeadlines;
