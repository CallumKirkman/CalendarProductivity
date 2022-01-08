import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "./EventsData";

const EVENTS_KEY = "@events_key";

const readEvents = async () => {
  try {
    let jsonList = [];
    const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);

    if (jsonValue !== null) {
      for (var i = 0; i < eventsData.length; i++) {
        jsonList.push(eventsData[i]);
      }
      return jsonList;
    }
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export default readEvents;
