import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "../../components/eventsData";
import deadlinesData from "../../components/deadlinesData";

const readData = () => {
  const EVENTS_KEY = "@events_key";
  const DEADLINES_KEY = "@deadlines_key";

  const readEventsArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);
      let jsonList = [];

      if (jsonValue !== null) {
        for (var i = 0; i < eventsData.length; i++) {
          jsonList.push(eventsData[i]);
        }

        console.log(jsonList);
        // return jsonList;
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  return readEventsArray();
};

export default readData;
