import AsyncStorage from "@react-native-async-storage/async-storage";

const EVENTS_KEY = "@events_key";

const writeEvents = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(EVENTS_KEY, jsonValue);

    // alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

export default writeEvents;
