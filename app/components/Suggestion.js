import { useState, useEffect } from "react";

import { createFixedWeekDate } from "react-native-week-view";

import readEvents from "./ReadEvents";
import readDeadlines from "./ReadDeadlines";
import readRequirements from "./ReadRequirements";
import writeSuggestions from "./WriteSuggestions";

const Suggestion = ({ navigation }) => {
  const [eventTimes, setEventTimes] = useState([]);
  const [deadlineTimes, setDeadlineTimes] = useState([]);
  const [localRequirements, setLocalRequirements] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const sendSuggestions = (
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  ) => {
    let suggestionArray = [];

    for (let i = 0; i < sunday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("SUN", sunday[i]),
        endDate: createFixedWeekDate("SUN", sunday[i] + 1),
        color: "#E7E7E7",
      });
    }
    for (let i = 0; i < monday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("MON", monday[i]),
        endDate: createFixedWeekDate("MON", monday[i] + 1),
        color: "#E7E7E7",
      });
    }
    for (let i = 0; i < tuesday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("TUE", tuesday[i]),
        endDate: createFixedWeekDate("TUE", tuesday[i] + 1),
        color: "#E7E7E7",
      });
    }
    for (let i = 0; i < wednesday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("WED", wednesday[i]),
        endDate: createFixedWeekDate("WED", wednesday[i] + 1),
        color: "#E7E7E7",
      });
    }
    for (let i = 0; i < thursday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("THU", thursday[i]),
        endDate: createFixedWeekDate("THU", thursday[i] + 1),
        color: "#E7E7E7",
      });
    }
    for (let i = 0; i < friday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("FRI", friday[i]),
        endDate: createFixedWeekDate("FRI", friday[i] + 1),
        color: "#E7E7E7",
      });
    }
    for (let i = 0; i < saturday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("SAT", saturday[i]),
        endDate: createFixedWeekDate("SAT", saturday[i] + 1),
        color: "#E7E7E7",
      });
    }

    // console.log(suggestionArray);
    writeSuggestions(suggestionArray);
    navigation.push("Timetable");
  };

  const getData = () => {
    readRequirements().then((data) => {
      let dataArray = [];

      for (let i = 0; i < data.length; i++) {
        dataArray.push(data[i]);
      }

      if (dataArray === undefined || dataArray.length == 0) {
        console.log("No data, setting default");
        dataArray.push(8);
        dataArray.push(23);
        dataArray.push(1);
      }

      setLocalRequirements(dataArray);
      // console.log("User requirements -------------");
      // console.log(dataArray);
    });

    readEvents().then((events) => {
      let eventTimes = [];

      for (let i = 0; i < events.length; i++) {
        eventTimes.push(events[i].startDate);
        eventTimes.push(events[i].endDate);
      }

      let sortedTimes = eventTimes.sort(); // Chronoligical order (Maybe doesnt account for overlapping event)

      setEventTimes(sortedTimes);
      // console.log("Local Events -------------");
      // console.log(sortedTimes);
    });

    readDeadlines().then((deadlines) => {
      let deadlineTimes = [];

      for (let i = 0; i < deadlines.length; i++) {
        deadlineTimes.push(deadlines[i].startDate);
        deadlineTimes.push(deadlines[i].endDate);
      }

      let sortedTimes = deadlineTimes.sort(); // Chronoligical order (Maybe doesnt account for overlapping event)

      setDeadlineTimes(sortedTimes);
      // console.log("Local Deadlines -------------");
      // console.log(sortedTimes);
    });
  };

  const dateFormat = () => {
    for (let i = 0; i < eventTimes.length; i++) {
      let newDate = new Date(eventTimes[i]);
      eventTimes[i] = newDate;
    }

    for (let i = 0; i < deadlineTimes.length; i++) {
      let newDate = new Date(deadlineTimes[i]);
      deadlineTimes[i] = newDate;
    }
  };

  const splitDates = (times) => {
    let startDates = [];
    let endDates = [];

    times.filter((element, index) => {
      if (index % 2 === 0) {
        startDates.push(times[index]);
      } else {
        endDates.push(times[index]);
      }
    });
    return { startDates, endDates };
  };

  const splitDays = (dates) => {
    let weekEvents = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    };
    let pair = {};
    for (let i = 0; i < dates.startDates.length; i++) {
      switch (dates.startDates[i].getDay()) {
        case 0:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.sunday.push(pair);
          break;
        case 1:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.monday.push(pair);
          break;
        case 2:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.tuesday.push(pair);
          break;
        case 3:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.wednesday.push(pair);
          break;
        case 4:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.thursday.push(pair);
          break;
        case 5:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.friday.push(pair);
          break;
        case 6:
          pair = {
            start: dates.startDates[i].getHours(),
            end: dates.endDates[i].getHours(),
          };
          weekEvents.saturday.push(pair);
      }
    }
    return weekEvents;
  };

  const getActiveHours = (day, start, end, week) => {
    // Create active hours
    let dayHours = Array(end - 1 - start + 1)
      .fill()
      .map((_, idx) => start + idx);

    // For each event in day
    let filtered = dayHours;
    for (let x in week[day]) {
      let start = week[day][x].start;
      let end = week[day][x].end;

      // Filter events out of active hours
      filtered = filtered.filter((element, index) => {
        if (element < start || element >= end) {
          return element;
        }
      });
    }
    return filtered;
  };

  const suggestEveryOtherHour = (times) => {
    let result = [];
    times.filter((element, index) => {
      if (index % 2 === 0) {
        // result.push(times[index]); // return even index
      } else {
        result.push(times[index]); // return odd index
      }
    });

    return result;
  };

  if (eventTimes.length === 0 || deadlineTimes.length === 0) {
    console.log("No data yet");
  } else {
    console.log("Data found");

    // Get times from user
    let wakeupTime = localRequirements[0]; // 8am
    let sleepTime = localRequirements[1]; // 11pm
    let restTime = localRequirements[2]; // 1 hour

    let number = parseInt(wakeupTime);
    wakeupTime = number;
    number = parseInt(sleepTime);
    sleepTime = number;
    number = parseInt(restTime);
    restTime = number;

    // Format strings to dates
    dateFormat();

    // Split to start and end dates
    let eventDates = splitDates(eventTimes);
    // let deadlineDates = splitDates(deadlineTimes);

    // Split by day
    let weekEvents = splitDays(eventDates);

    // Create free hours
    let mondayFreeHours = getActiveHours(
      "monday",
      wakeupTime,
      sleepTime,
      weekEvents
    );
    let tuesdayFreeHours = getActiveHours(
      "tuesday",
      wakeupTime,
      sleepTime,
      weekEvents
    );
    let wednesdayFreeHours = getActiveHours(
      "wednesday",
      wakeupTime,
      sleepTime,
      weekEvents
    );
    let thursdayFreeHours = getActiveHours(
      "thursday",
      wakeupTime,
      sleepTime,
      weekEvents
    );
    let fridayFreeHours = getActiveHours(
      "friday",
      wakeupTime,
      sleepTime,
      weekEvents
    );
    let saturdayFreeHours = getActiveHours(
      "saturday",
      wakeupTime,
      sleepTime,
      weekEvents
    );
    let sundayFreeHours = getActiveHours(
      "sunday",
      wakeupTime,
      sleepTime,
      weekEvents
    );

    let sundaySuggestion = suggestEveryOtherHour(sundayFreeHours);
    let mondaySuggestion = suggestEveryOtherHour(mondayFreeHours);
    let tuesdaySuggestion = suggestEveryOtherHour(tuesdayFreeHours);
    let wednesdaySuggestion = suggestEveryOtherHour(wednesdayFreeHours);
    let thursdaySuggestion = suggestEveryOtherHour(thursdayFreeHours);
    let fridaySuggestion = suggestEveryOtherHour(fridayFreeHours);
    let saturdaySuggestion = suggestEveryOtherHour(saturdayFreeHours);

    sendSuggestions(
      sundaySuggestion,
      mondaySuggestion,
      tuesdaySuggestion,
      wednesdaySuggestion,
      thursdaySuggestion,
      fridaySuggestion,
      saturdaySuggestion
    );
  }

  return null;
};

export default Suggestion;
