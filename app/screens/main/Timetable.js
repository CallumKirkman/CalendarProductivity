import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Button,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

import readData from "../../components/ReadData";

import WeekView from "react-native-week-view";

import Colour from "../../static/Colour";
import styles from "../../static/Styles";

const Timetable = ({ navigation }) => {
  const [localData, setLocalData] = useState([]);
  const [numDays, setNumDays] = useState(7);

  let refreshBoolean = false;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    readData().then((data) => {
      for (let i = 0; i < data.length; i++) {
        let newStartDate = new Date(data[i].startDate);
        data[i].startDate = newStartDate;

        let newEndDate = new Date(data[i].endDate);
        data[i].endDate = newEndDate;
      }

      // console.log(
      //   "Timetable data -----------------------------------------------------------------"
      // );
      // console.log(data);
      setLocalData(data);
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

  // For debugging purposes - force single week
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

  const EventsNav = () => {
    navigation.navigate("Events");
  };

  const daysToggle = () => {
    if (numDays === 7) {
      setNumDays(1);
    } else {
      setNumDays(7);
    }
  };

  if (localData.length === 0) {
    console.log("No data yet");
    refreshBoolean = true;
  } else {
    console.log("Data found");
    refreshBoolean = false;
  }

  return (
    <SafeAreaView style={styles.timetableContainer}>
      <View style={styles.topButtons}>
        <Button title="Days" color={Colour.red} onPress={daysToggle} />
        <Button title=" + " color={Colour.red} onPress={EventsNav} />
      </View>

      <WeekView
        events={localData}
        selectedDate={new Date()}
        TodayHeaderComponent={showToday}
        numberOfDays={numDays}
        weekStartsOn={0} // Change to sunday when toggle back to 7, why?
        onEventPress={onEventPress}
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
        isRefreshing={refreshBoolean}
        RefreshComponent={showRefresh}
      />
    </SafeAreaView>
  );
};

export default Timetable;
