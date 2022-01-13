import AsyncStorage from "@react-native-async-storage/async-storage";

const EVENTS_KEY = "@events_key";

const readEvents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

export default readEvents;
