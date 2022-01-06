import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

import WeekView from "react-native-week-view";

import eventsData from "../../components/eventsData";
import readEvents from "../../components/readEvents";
import readDeadlines from "../../components/readDeadlines";
import Colour from "../../static/Colour";

let localEvents = "";
let localDeadlines = "";

const logEvents = () => {
  readEvents().then((events) => {
    // console.log(
    //   "Local Events -----------------------------------------------------------------"
    // );
    // console.log(events);

    localEvents = events;
  });
};

const logDeadlines = () => {
  readDeadlines().then((deadlines) => {
    // console.log(
    //   "Local Deadlines -----------------------------------------------------------------"
    // );
    // console.log(deadlines);

    localDeadlines = deadlines;
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

class Timetable extends React.Component {
  state = {
    events: eventsData,
    selectedDate: new Date(),
  };

  onEventPress = ({ description, startDate, endDate, location, type }) => {
    Alert.alert(
      `${description}`,
      `Start: ${startDate} \nEnd: ${endDate} \nLocation: ${location} \nType: ${type}`
    );
  };

  onGridClick = (event, startHour, date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // zero-based
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    Alert.alert(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
  };

  onDragEvent = (event, newStartDate, newEndDate) => {
    // Here you should update the event in your DB with the new date and hour
    this.setState({
      events: [
        ...this.state.events.filter((e) => e.id !== event.id),
        {
          ...event,
          startDate: newStartDate,
          endDate: newEndDate,
        },
      ],
    });
  };

  render() {
    logEvents();
    logDeadlines();

    const { events, selectedDate } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <WeekView
          ref={(r) => {
            this.componentRef = r;
          }}
          events={events}
          selectedDate={selectedDate}
          TodayHeaderComponent={showToday}
          numberOfDays={7}
          onEventPress={this.onEventPress}
          onGridClick={this.onGridClick}
          headerStyle={styles.header}
          headerTextStyle={styles.headerText}
          hourTextStyle={styles.hourText}
          eventContainerStyle={styles.eventContainer}
          formatDateHeader={showFixedComponent ? "ddd" : "ddd DD"}
          hoursInDisplay={8}
          timeStep={60}
          startHour={9}
          fixedHorizontally={showFixedComponent}
          showTitle={!showFixedComponent}
          showNowLine
          onDragEvent={this.onDragEvent}
          isRefreshing={false}
          RefreshComponent={showRefresh}
        />
      </SafeAreaView>
    );
  }
}

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
