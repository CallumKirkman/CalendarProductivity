import AsyncStorage from "@react-native-async-storage/async-storage";

import deadlinesData from "./DeadlinesData";

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

// const sendData = () => {
//   if (!deadlinesData) return;
//   saveDeadlinesArray(deadlinesData);
// };

export default writeDeadlines;
