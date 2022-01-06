import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "../../components/eventsData";
import deadlinesData from "../../components/deadlinesData";

const writeData = () => {
  const EVENTS_KEY = "@events_key";
  const DEADLINES_KEY = "@deadlines_key";

  const saveEventsArray = async () => {
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

  return saveEventsArray(eventsData);
};

export default writeData;
