import AsyncStorage from "@react-native-async-storage/async-storage";

import deadlinesData from "./deadlinesData";

const DEADLINES_KEY = "@deadlines_key";

const readDeadlines = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DEADLINES_KEY);
    let jsonList = [];

    if (jsonValue !== null) {
      for (var i = 0; i < deadlinesData.length; i++) {
        jsonList.push(deadlinesData[i]);
      }

      // console.log(jsonList);
      return jsonList;
    }
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export default readDeadlines;
