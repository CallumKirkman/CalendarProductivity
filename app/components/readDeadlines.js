import AsyncStorage from "@react-native-async-storage/async-storage";

import deadlinesData from "./DeadlinesData";

const DEADLINES_KEY = "@deadlines_key";

const readDeadlines = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DEADLINES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }

  // try {
  //   let jsonList = [];
  //   const jsonValue = await AsyncStorage.getItem(DEADLINES_KEY);

  //   if (jsonValue !== null) {
  //     for (var i = 0; i < deadlinesData.length; i++) {
  //       jsonList.push(deadlinesData[i]);
  //     }
  //     return jsonList;
  //   }
  // } catch (e) {
  //   alert("Failed to fetch the data from storage");
  // }
};

export default readDeadlines;
