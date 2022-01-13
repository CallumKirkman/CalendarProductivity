import AsyncStorage from "@react-native-async-storage/async-storage";

const EVENTS_KEY = "@events_key";
const DEADLINES_KEY = "@deadlines_key";
const SUGGESTION_KEY = "@suggestion_key";

const readData = async () => {
  try {
    const eventsValue = await AsyncStorage.getItem(EVENTS_KEY);
    // console.log("Events values =========");
    // console.log(eventsValue);

    let newEventsValue = eventsValue != null ? JSON.parse(eventsValue) : [];

    const deadlinesValue = await AsyncStorage.getItem(DEADLINES_KEY);
    // console.log("Deadline values =========");
    // console.log(deadlinesValue);

    let newDeadlinesValue =
      deadlinesValue != null ? JSON.parse(deadlinesValue) : [];

    const suggestionsValue = await AsyncStorage.getItem(SUGGESTION_KEY);
    // console.log("Suggestions values =========");
    // console.log(suggestionsValue);

    let newSuggestionsValue =
      suggestionsValue != null ? JSON.parse(suggestionsValue) : [];

    let parseArray = newEventsValue.concat(
      newSuggestionsValue,
      newDeadlinesValue
    );
    // console.log("All values =========");
    // console.log(parseArray);

    return parseArray;
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export default readData;
