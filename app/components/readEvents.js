import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "./eventsData";

const EVENTS_KEY = "@events_key";

const readEvents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);
    let jsonList = [];

    if (jsonValue !== null) {
      for (var i = 0; i < eventsData.length; i++) {
        jsonList.push(eventsData[i]);
      }

      // console.log(jsonList);
      return jsonList;
    }
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export default readEvents;
