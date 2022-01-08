import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "./EventsData";

const EVENTS_KEY = "@events_key";

const writeEvents = async () => {
  try {
    const jsonValue = JSON.stringify(eventsData);
    await AsyncStorage.setItem(EVENTS_KEY, jsonValue);

    alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

// const sendData = () => {
//   if (!eventsData) return;
//   saveEventsArray(eventsData);
// };

export default writeEvents;
