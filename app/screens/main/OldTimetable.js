import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Alert, Text } from "react-native";
import TimeTableView, { genTimeBlock } from "react-native-timetable";

import oldEventsData from "../../components/oldEventsData";
import Colour from "../../static/Colour";
import Style from "../../static/Style";

const getCurrentDate = () => {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  if (month.toString.length == 1) {
    month = "0" + month;
  }
  if (day.toString.length == 1) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day; //format: yyyy-mm-dd;
};

class OldTimetable extends Component {
  constructor(props) {
    super(props);
    this.numOfDays = 5;
    this.pivotDate = genTimeBlock("mon");
  }

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  onEventPress = (evt) => {
    Alert.alert("onEventPress", JSON.stringify(evt));
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TimeTableView
            scrollViewRef={this.scrollViewRef}
            events={eventsData}
            pivotTime={9}
            pivotEndTime={20}
            pivotDate={this.pivotDate}
            numberOfDays={this.numOfDays}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            formatDateHeader="dddd"
            locale="en"
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default OldTimetable;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colour.blue,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 40,
    backgroundColor: Colour.offWhite,
  },
});
