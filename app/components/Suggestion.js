import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

import { createFixedWeekDate } from "react-native-week-view";

import readEvents from "./ReadEvents";
import readDeadlines from "./ReadDeadlines";
import Colour from "../static/Colour";
import writeSuggestions from "./WriteSuggestions";

const Suggestion = ({ navigation }) => {
  const [eventTimes, setEventTimes] = useState([]);
  const [deadlineTimes, setDeadlineTimes] = useState([]);

  // Get times from user
  let wakeupTime = 8; // 8am
  let sleepTime = 23; // 11pm

  let dayHours = 24 - wakeupTime - (24 - sleepTime);
  let weekHours = 7 * dayHours;

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

    // let suggestionTemplate = {
    //   description: "Revise 1 hour",
    //   startDate: createFixedWeekDate("MON", 14),
    //   endDate: createFixedWeekDate("MON", 16),
    //   color: Colour.mediumGray,
    // };

    // console.log("friday =", friday);
    // for (let i = 0; i < monday.length; i++) {
    //   // console.log(monday[i]);
    //   // console.log(monday[i] + 1);
    //   suggestionTemplate.startDate = createFixedWeekDate("MON", monday[i]);
    //   suggestionTemplate.endDate = createFixedWeekDate("MON", monday[i] + 1);
    //   console.log(suggestionTemplate);
    //   suggestionArray.push(suggestionTemplate);
    // }

    for (let i = 0; i < sunday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("SUN", sunday[i]),
        endDate: createFixedWeekDate("SUN", sunday[i] + 1),
        color: Colour.mediumGray,
      });
    }
    for (let i = 0; i < monday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("MON", monday[i]),
        endDate: createFixedWeekDate("MON", monday[i] + 1),
        color: Colour.mediumGray,
      });
    }
    for (let i = 0; i < tuesday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("TUE", tuesday[i]),
        endDate: createFixedWeekDate("TUE", tuesday[i] + 1),
        color: Colour.mediumGray,
      });
    }
    for (let i = 0; i < wednesday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("WED", wednesday[i]),
        endDate: createFixedWeekDate("WED", wednesday[i] + 1),
        color: Colour.mediumGray,
      });
    }
    for (let i = 0; i < thursday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("THU", thursday[i]),
        endDate: createFixedWeekDate("THU", thursday[i] + 1),
        color: Colour.mediumGray,
      });
    }
    for (let i = 0; i < friday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("FRI", friday[i]),
        endDate: createFixedWeekDate("FRI", friday[i] + 1),
        color: Colour.mediumGray,
      });
    }
    for (let i = 0; i < saturday.length; i++) {
      suggestionArray.push({
        description: "Revise 1 hour",
        startDate: createFixedWeekDate("SAT", saturday[i]),
        endDate: createFixedWeekDate("SAT", saturday[i] + 1),
        color: Colour.mediumGray,
      });
    }

    // console.log(suggestionArray);
    // console.log("Suggestion successfully ran!");
    writeSuggestions(suggestionArray);
    navigation.push("Timetable");
  };

  const getData = () => {
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

    // console.log("Format dates --------------");
    // console.log(eventTimes);
    // console.log(deadlineTimes);
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

    // console.log("Split -------");
    // console.log(startDates);
    // console.log(endDates);
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
    // console.log("Week split ---------");
    // console.log(weekEvents);
    return weekEvents;
  };

  const getActiveHours = (day, start, end, week) => {
    // Create active hours
    let dayHours = Array(end - 1 - start + 1)
      .fill()
      .map((_, idx) => start + idx);

    // console.log(dayHours);

    let filtered = dayHours;
    // For each event in day
    for (let x in week[day]) {
      let start = week[day][x].start;
      let end = week[day][x].end;
      // console.log(start, end);

      // Filter events out of active hours
      filtered = filtered.filter((element, index) => {
        if (element < start || element >= end) {
          return element;
        }
      });
    }
    // console.log(filtered);
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

    // console.log(sundayFreeHours);
    let sundaySuggestion = suggestEveryOtherHour(sundayFreeHours);
    // console.log(sundaySuggestion);

    // console.log(mondayFreeHours);
    let mondaySuggestion = suggestEveryOtherHour(mondayFreeHours);
    // console.log(mondaySuggestion);

    // console.log(tuesdayFreeHours);
    let tuesdaySuggestion = suggestEveryOtherHour(tuesdayFreeHours);
    // console.log(tuesdaySuggestion);

    // console.log(wednesdayFreeHours);
    let wednesdaySuggestion = suggestEveryOtherHour(wednesdayFreeHours);
    // console.log(wednesdaySuggestion);

    // console.log(thursdayFreeHours);
    let thursdaySuggestion = suggestEveryOtherHour(thursdayFreeHours);
    // console.log(thursdaySuggestion);

    // console.log(fridayFreeHours);
    let fridaySuggestion = suggestEveryOtherHour(fridayFreeHours);
    // console.log(fridaySuggestion);

    // console.log(saturdayFreeHours);
    let saturdaySuggestion = suggestEveryOtherHour(saturdayFreeHours);
    // console.log(saturdaySuggestion);

    sendSuggestions(
      sundaySuggestion,
      mondaySuggestion,
      tuesdaySuggestion,
      wednesdaySuggestion,
      thursdaySuggestion,
      fridaySuggestion,
      saturdaySuggestion
    );
  } // End of code

  return null;
};

export default Suggestion;
