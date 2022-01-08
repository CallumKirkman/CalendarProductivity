import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "./EventsData";
import deadlinesData from "./DeadlinesData";

const EVENTS_KEY = "@events_key";
const DEADLINES_KEY = "@deadlines_key";

const readData = async () => {
  try {
    let jsonList = [];

    const eventsValue = await AsyncStorage.getItem(EVENTS_KEY);

    if (eventsValue !== null) {
      for (var i = 0; i < eventsData.length; i++) {
        jsonList.push(eventsData[i]);
      }
    }

    const deadlinesValue = await AsyncStorage.getItem(DEADLINES_KEY);

    if (deadlinesValue !== null) {
      for (var i = 0; i < deadlinesData.length; i++) {
        jsonList.push(deadlinesData[i]);
      }
    }

    return jsonList;
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export default readData;
