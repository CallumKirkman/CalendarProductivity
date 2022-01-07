import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

import WeekView from "react-native-week-view";

import eventsData from "../../components/eventsData";
import deadlinesData from "../../components/deadlinesData";
import readEvents from "../../components/readEvents";
import readDeadlines from "../../components/readDeadlines";
import Colour from "../../static/Colour";

const Timetable = () => {
  console.log("Timetable");

  const [localEvents, setLocalEvents] = useState([]);
  const [localDeadlines, setLocalDeadlines] = useState([]);

  let refreshBoolean = false;
  let numbDays = 7;

  useEffect(() => {
    logEvents();
    logDeadlines();
  }, []);

  const logEvents = () => {
    readEvents().then((events) => {
      // console.log(
      //   "Local Events -----------------------------------------------------------------"
      // );
      // console.log(events);

      setLocalEvents(events);
    });
  };

  const logDeadlines = () => {
    readDeadlines().then((deadlines) => {
      // console.log(
      //   "Local Deadlines -----------------------------------------------------------------"
      // );
      // console.log(deadlines);

      setLocalDeadlines(deadlines);
    });
  };

  const showToday = ({ formattedDate, textStyle }) => (
    <Text style={[textStyle, { fontWeight: "bold", fontSize: 13 }]}>
      {formattedDate}
    </Text>
  );

  const showRefresh = ({ style }) => (
    <ActivityIndicator style={style} color={Colour.red} size="large" />
  );

  // For debugging purposes
  const showFixedComponent = false;

  const onEventPress = ({
    description,
    startDate,
    endDate,
    location,
    type,
  }) => {
    Alert.alert(
      `${description}`,
      `Start: ${startDate} \nEnd: ${endDate} \nLocation: ${location} \nType: ${type}`
    );
  };

  const onGridClick = (event, startHour, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // zero-based
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    Alert.alert(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
  };

  if (localEvents.length === 0 || localDeadlines.length === 0) {
    console.log("No data yet");
    refreshBoolean = true;
  } else {
    console.log("Data found");
    refreshBoolean = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WeekView
        // ref={(r) => {
        //   componentRef = r;
        // }}
        events={localEvents}
        selectedDate={new Date()}
        TodayHeaderComponent={showToday}
        numberOfDays={numbDays}
        onEventPress={onEventPress}
        onGridClick={onGridClick}
        headerStyle={styles.header}
        headerTextStyle={styles.headerText}
        hourTextStyle={styles.hourText}
        eventContainerStyle={styles.eventContainer}
        formatDateHeader={showFixedComponent ? "ddd" : "ddd DD"}
        hoursInDisplay={8}
        timeStep={30}
        startHour={9}
        fixedHorizontally={showFixedComponent}
        showTitle={!showFixedComponent}
        showNowLine
        // onDragEvent={onDragEvent}
        isRefreshing={refreshBoolean}
        RefreshComponent={showRefresh}
      />
    </SafeAreaView>
  );
};

export default Timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 40,
    backgroundColor: Colour.offWhite,
  },
  header: {
    backgroundColor: Colour.blue,
    borderColor: Colour.black,
  },
  headerText: {
    color: Colour.white,
  },
  hourText: {
    color: Colour.black,
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: Colour.black,
  },
});
