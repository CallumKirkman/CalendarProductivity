import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

import readEvents from "./ReadEvents";
import readDeadlines from "./ReadDeadlines";

const Suggestion = () => {
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

  const createFreeHours = (day, hours, week) => {
    // console.log("Create free hours -----");
    // console.log(week);
    // console.log(hours);
    // // For each active hour
    // for (let i = 0; i < hours.length; i++) {
    //   // For each event in week
    //   for (let x in week.monday) {
    //     if (week.monday[x] <= hours[i] && hours[i] < week.monday[x]) {
    //       // console.log("Hour busy");
    //     }
    //   }
    //   // console.log("Hour free");
    // }
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

    console.log("Monday", mondayFreeHours);
  } // End of code

  return (
    // Suggested revise times
    <SafeAreaView>
      <Text>Suggestions</Text>
    </SafeAreaView>
  );
};

export default Suggestion;
