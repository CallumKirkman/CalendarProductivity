import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

import WeekView from "react-native-week-view";

import readData from "../../components/ReadData";
// import readEvents from "../../components/ReadEvents";
// import readDeadlines from "../../components/ReadDeadlines";
import Colour from "../../static/Colour";

const Timetable = ({ navigation }) => {
  console.log("Timetable");

  // const [localEvents, setLocalEvents] = useState([]);
  // const [localDeadlines, setLocalDeadlines] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [numDays, setNumDays] = useState(7);

  let refreshBoolean = false;

  useEffect(() => {
    // logEvents();
    // logDeadlines();
    logData();
  }, []);

  const logData = () => {
    readData().then((data) => {
      // console.log(
      //   "Timetable data -----------------------------------------------------------------"
      // );
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        let newStartDate = new Date(data[i].startDate);
        data[i].startDate = newStartDate;

        let newEndDate = new Date(data[i].endDate);
        data[i].endDate = newEndDate;
      }

      // console.log(data);
      setLocalData(data);
    });
  };

  // const logEvents = () => {
  //   readEvents().then((events) => {
  //     // console.log(
  //     //   "Local Events -----------------------------------------------------------------"
  //     // );
  //     // console.log(events);

  //     setLocalEvents(events);
  //   });
  // };

  // const logDeadlines = () => {
  //   readDeadlines().then((deadlines) => {
  //     // console.log(
  //     //   "Local Deadlines -----------------------------------------------------------------"
  //     // );
  //     // console.log(deadlines);

  //     setLocalDeadlines(deadlines);
  //   });
  // };

  const showToday = ({ formattedDate, textStyle }) => (
    <Text style={[textStyle, { fontWeight: "bold", fontSize: 13 }]}>
      {formattedDate}
    </Text>
  );

  const showRefresh = ({ style }) => (
    <ActivityIndicator style={style} color={Colour.red} size="large" />
  );

  // For debugging purposes - force sinlge week
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

  const EventsNav = () => {
    navigation.navigate("Events");
  };

  const daysToggle = () => {
    if (numDays === 7) {
      setNumDays(1);
      // Goto date
      // } else if (numDays === 5) {
      //   setNumDays(5);
      //   // Goto Monday
    } else {
      setNumDays(7);
      // Goto Monday - default sunday?
    }
  };

  // if (localEvents.length === 0 || localDeadlines.length === 0) {
  //   console.log("No data yet");
  //   refreshBoolean = true;
  // } else {
  //   console.log("Data found");
  //   refreshBoolean = false;
  // }

  if (localData.length === 0) {
    console.log("No data yet");
    refreshBoolean = true;
  } else {
    console.log("Data found");
    refreshBoolean = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtons}>
        <Button title="Days" color="red" onPress={daysToggle} />
        <Button title=" + " color="red" onPress={EventsNav} />
      </View>

      <WeekView
        events={localData}
        selectedDate={new Date()}
        TodayHeaderComponent={showToday}
        numberOfDays={numDays}
        weekStartsOn={0} // Change to sunday when toggle back to 7, why?
        onEventPress={onEventPress}
        onGridClick={onGridClick}
        headerStyle={styles.header}
        headerTextStyle={styles.headerText}
        hourTextStyle={styles.hourText}
        eventContainerStyle={styles.eventContainer}
        formatDateHeader={showFixedComponent ? "ddd" : "ddd DD"}
        hoursInDisplay={8}
        timeStep={30}
        startHour={10}
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
    paddingTop: 40,
    backgroundColor: Colour.offWhite,
  },
  topButtons: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
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
