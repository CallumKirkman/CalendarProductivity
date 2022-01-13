import AsyncStorage from "@react-native-async-storage/async-storage";

const DEADLINES_KEY = "@deadlines_key";

const writeDeadlines = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(DEADLINES_KEY, jsonValue);

    // alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

export default writeDeadlines;
