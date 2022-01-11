import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";

import writeEvents from "../../components/WriteEvents";
import writeDeadlines from "../../components/WriteDeadlines";
// import readData from "../../components/readData";
import readEvents from "../../components/ReadEvents";
import readDeadlines from "../../components/ReadDeadlines";
import Colour from "../../static/Colour";

import { createFixedWeekDate } from "react-native-week-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

const EditEvent = ({ route, navigation }) => {
  // const [eventItem, setEventItem] = useState("");
  const [description, onDescriptionChange] = useState("");
  const [startDay, onStartDayChange] = useState("");
  const [startHour, onStartHourChange] = useState("");
  const [startMinute, onStartMinuteChange] = useState("");
  const [endDay, onEndDayChange] = useState("");
  const [endHour, onEndHourChange] = useState("");
  const [endMinute, onEndMinuteChange] = useState("");
  const [colour, onColourChange] = useState("");
  const [location, onLocationChange] = useState("");
  const [type, onTypeChange] = useState("");

  let paramsFound = false;

  const createDate = (day, hours, minutes = 0, seconds = 0) => {
    const date = moment();
    date.isoWeekday(day);
    date.hours(hours);
    date.minutes(minutes);
    date.seconds(seconds);
    return date.toDate();
  };

  if (route.params) {
    // console.log("Got params!");
    paramsFound = true;
    // console.log(route.params);
  } else {
    // console.log("Params not found!");
  }

  const eventsNav = () => {
    navigation.navigate("Events");
  };

  const submitEvent = () => {
    if (
      description &&
      startDay &&
      startHour &&
      startMinute &&
      endDay &&
      endHour &&
      endMinute &&
      colour &&
      location &&
      type != ""
    ) {
      let startDate = createDate(startDay, startHour, startMinute);
      let endDate = createDate(endDay, endHour, endMinute);

      // let colour = Colour.black; // Hex colour

      if (paramsFound === true) {
        const { item, localEvents } = route.params;

        let entry = {
          id: localEvents.length + 1,
          description: description,
          startDate: createFixedWeekDate(startDay, startHour, startMinute),
          endDate: createFixedWeekDate(endDay, endHour, endMinute),
          color: colour,
          location: location,
          type: type,
        };

        localEvents.push(entry);
        // console.log(localEvents);
        writeEvents(localEvents);
        navigation.navigate("Events");
      } else {
        let entry = [
          {
            id: 1,
            description: description,
            startDate: createFixedWeekDate(startDay, startHour, startMinute),
            endDate: createFixedWeekDate(endDay, endHour, endMinute),
            color: colour,
            location: location,
            type: type,
          },
        ];

        // console.log(entry);
        writeEvents(entry);
        navigation.navigate("Events");
      }
    } else {
      alert("Please fill out all forms");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Back" color="blue" onPress={eventsNav} />
      <TextInput
        style={styles.input}
        onChangeText={onDescriptionChange}
        value={description}
        placeholder="Description"
        type="text"
        onSubmitEditing={submitEvent}
      />
      <View style={styles.dateView}>
        <TextInput
          style={styles.input}
          onChangeText={onStartDayChange}
          value={startDay}
          placeholder="Day"
          type="date"
          onSubmitEditing={submitEvent}
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartHourChange}
          value={startHour}
          placeholder="Hour"
          type="date"
          onSubmitEditing={submitEvent}
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartMinuteChange}
          value={startMinute}
          placeholder="Minute"
          type="date"
          onSubmitEditing={submitEvent}
        />
      </View>
      <View style={styles.dateView}>
        <TextInput
          style={styles.input}
          onChangeText={onEndDayChange}
          value={endDay}
          placeholder="Day"
          type="date"
          onSubmitEditing={submitEvent}
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndHourChange}
          value={endHour}
          placeholder="Hour"
          type="date"
          onSubmitEditing={submitEvent}
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndMinuteChange}
          value={endMinute}
          placeholder="Minute"
          type="date"
          onSubmitEditing={submitEvent}
        />
      </View>
      <TextInput
        style={{
          height: 30,
          margin: 10,
          borderWidth: 1,
          paddingLeft: 10,
          backgroundColor: colour,
        }}
        onChangeText={onColourChange}
        value={colour}
        placeholder="Colour?"
        type="color"
        onSubmitEditing={submitEvent}
      />
      <TextInput
        style={styles.input}
        onChangeText={onLocationChange}
        value={location}
        placeholder="Location"
        type="text"
        onSubmitEditing={submitEvent}
      />
      <TextInput
        style={styles.input}
        onChangeText={onTypeChange}
        value={type}
        placeholder="Type"
        type="text"
        onSubmitEditing={submitEvent}
      />

      <Text>
        id: number auto? description: text startDate: date endDate: date color:
        colour location: text type: text
      </Text>
      <Text />

      {/* <Text>{JSON.stringify(eventItem)}</Text>
      <Text /> */}

      {/* <Text>id: {JSON.stringify(eventItem.id)}</Text>
      <Text>description: {JSON.stringify(eventItem.description)}</Text>
      <Text>startDate: {JSON.stringify(eventItem.startDate)}</Text>
      <Text>endDate: {JSON.stringify(eventItem.endDate)}</Text>
      <Text>color: {JSON.stringify(eventItem.color)}</Text>
      <Text>location: {JSON.stringify(eventItem.location)}</Text>
      <Text>type: {JSON.stringify(eventItem.type)}</Text> */}
    </SafeAreaView>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 15,
    // backgroundColor: Colour.darkGray,
  },
  input: {
    height: 30,
    margin: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  dateView: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // backgroundColor: "purple",
  },
});
