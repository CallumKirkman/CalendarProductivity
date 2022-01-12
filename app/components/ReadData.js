import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "./EventsData";
import deadlinesData from "./DeadlinesData";

const EVENTS_KEY = "@events_key";
const DEADLINES_KEY = "@deadlines_key";
const SUGGESTION_KEY = "@suggestion_key";

const readData = async () => {
  try {
    let jsonList = [];

    // console.log("Events values =========");
    const eventsValue = await AsyncStorage.getItem(EVENTS_KEY);
    // jsonList.push(values);
    // console.log(eventsData.length);
    // console.log(eventsValue);

    let newEventsValue = eventsValue != null ? JSON.parse(eventsValue) : [];
    // console.log(newEventsValue);

    // if (eventsValue !== null) {
    //   for (var i = 0; i < eventsData.length; i++) {
    //     jsonList.push(eventsData[i]);
    //   }
    // }

    // console.log("Deadline values =========");
    const deadlinesValue = await AsyncStorage.getItem(DEADLINES_KEY);
    // jsonList.push(deadlinesValue);
    // console.log(deadlinesValue);

    let newDeadlinesValue =
      deadlinesValue != null ? JSON.parse(deadlinesValue) : [];
    // console.log(newDeadlinesValue);

    // if (deadlinesValue !== null) {
    //   for (var i = 0; i < deadlinesData.length; i++) {
    //     jsonList.push(deadlinesData[i]);
    //   }
    // }

    // console.log("Suggestions values =========");
    const suggestionsValue = await AsyncStorage.getItem(SUGGESTION_KEY);
    // jsonList.push(values);
    // console.log(suggestionsData.length);
    // console.log(suggestionsValue);

    let newSuggestionsValue =
      suggestionsValue != null ? JSON.parse(suggestionsValue) : [];
    // console.log(newSuggestionsValue);

    // if (suggestionsValue !== null) {
    //   for (var i = 0; i < suggestionsData.length; i++) {
    //     jsonList.push(suggestionsData[i]);
    //   }
    // }

    // console.log("All values =========");
    // let allValues = eventsValue.concat(deadlinesValue);
    // console.log(allValues);

    let parseArray = newEventsValue.concat(
      newSuggestionsValue,
      newDeadlinesValue
    );

    // console.log("parseArray --------");
    // console.log(parseArray);

    return parseArray;
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export default readData;
