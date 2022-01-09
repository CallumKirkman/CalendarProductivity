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

const EditDeadline = ({ route, navigation }) => {
  // const [deadlineItem, setDeadlineItem] = useState("");
  const [description, onDescriptionChange] = useState("");
  const [startDate, onStartDateChange] = useState("");
  const [endDate, onEndDateChange] = useState("");
  const [colour, onColourChange] = useState("");
  const [location, onLocationChange] = useState("");
  const [type, onTypeChange] = useState("");

  let paramsFound = false;

  if (route.params) {
    // console.log("Got params!");
    paramsFound = true;
    // console.log(route.params);
  } else {
    // console.log("Params not found!");
  }

  let deadlinesArray = [
    {
      id: 1,
      description: "Advanced Development",
      startDate: createFixedWeekDate("MON", 14),
      endDate: createFixedWeekDate("MON", 16),
      color: Colour.blue,
      location: "P225",
      type: "Lab",
    },
    {
      id: 2,
      description: "Software Q&T",
      startDate: createFixedWeekDate("MON", 18),
      endDate: createFixedWeekDate("MON", 19),
      color: Colour.red,
      location: "Lawrence",
      type: "Lecture",
    },
    {
      id: 3,
      description: "Advanced Development",
      startDate: createFixedWeekDate("TUE", 10),
      endDate: createFixedWeekDate("TUE", 12),
      color: Colour.blue,
      location: "Lawrence",
      type: "Lecture",
    },
    {
      id: 4,
      description: "Ubiquitous Computing",
      startDate: createFixedWeekDate("TUE", 16),
      endDate: createFixedWeekDate("TUE", 18),
      color: Colour.green,
      location: "P221",
      type: "Lab",
    },
    {
      id: 5,
      description: "Software Q&T",
      startDate: createFixedWeekDate("TUE", 18),
      endDate: createFixedWeekDate("TUE", 19),
      color: Colour.red,
      location: "P227",
      type: "Lab",
    },
    {
      id: 6,
      description: "Individual Project",
      startDate: createFixedWeekDate("WED", 12),
      endDate: createFixedWeekDate("WED", 14),
      color: Colour.darkPurple,
      location: "KG01",
      type: "Lecture",
    },
    {
      id: 7,
      description: "Ubiquitous Computing",
      startDate: createFixedWeekDate("WED", 14),
      endDate: createFixedWeekDate("WED", 16),
      color: Colour.green,
      location: "P235",
      type: "Lab",
    },
    {
      id: 8,
      description: "Software Q&T",
      startDate: createFixedWeekDate("THU", 11),
      endDate: createFixedWeekDate("THU", 12),
      color: Colour.red,
      location: "F112",
      type: "Seminar",
    },
  ];

  const deadlinesNav = () => {
    navigation.navigate("Events");
  };

  const submitDeadline = () => {
    if (
      description &&
      startDate &&
      endDate &&
      colour &&
      location &&
      type != ""
    ) {
      if (paramsFound === true) {
        const { item, localDeadlines } = route.params;

        let entry = {
          id: localDeadlines.length + 1,
          description: description,
          startDate: startDate,
          endDate: endDate,
          color: colour,
          location: location,
          type: type,
        };

        localDeadlines.push(entry);
        // console.log(localDeadlines);
        writeDeadlines(localDeadlines);
      } else {
        let entry = [
          {
            id: 1,
            description: description,
            startDate: startDate,
            endDate: endDate,
            color: colour,
            location: location,
            type: type,
          },
        ];

        // console.log(entry);
        writeDeadlines(entry);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Back" color="blue" onPress={deadlinesNav} />
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="ID?"
        type="number"
        keyboardType="numeric"
      /> */}
      <TextInput
        style={styles.input}
        onChangeText={onDescriptionChange}
        value={description}
        placeholder="Description"
        type="text"
        onSubmitEditing={submitDeadline}
      />
      <TextInput
        style={styles.input}
        onChangeText={onStartDateChange}
        value={startDate}
        placeholder="Start date"
        type="date"
        onSubmitEditing={submitDeadline}
      />
      <TextInput
        style={styles.input}
        onChangeText={onEndDateChange}
        value={endDate}
        placeholder="End date"
        type="date"
        onSubmitEditing={submitDeadline}
      />
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
        onSubmitEditing={submitDeadline}
      />
      <TextInput
        style={styles.input}
        onChangeText={onLocationChange}
        value={location}
        placeholder="Location"
        type="text"
        onSubmitEditing={submitDeadline}
      />
      <TextInput
        style={styles.input}
        onChangeText={onTypeChange}
        value={type}
        placeholder="Type"
        type="text"
        onSubmitEditing={submitDeadline}
      />

      <Text>
        id: number auto? description: text startDate: date endDate: date color:
        colour location: text type: text
      </Text>
      <Text />

      {/* <Text>{JSON.stringify(deadlineItem)}</Text>
      <Text /> */}

      {/* <Text>id: {JSON.stringify(deadlineItem.id)}</Text>
      <Text>description: {JSON.stringify(deadlineItem.description)}</Text>
      <Text>startDate: {JSON.stringify(deadlineItem.startDate)}</Text>
      <Text>endDate: {JSON.stringify(deadlineItem.endDate)}</Text>
      <Text>color: {JSON.stringify(deadlineItem.color)}</Text>
      <Text>location: {JSON.stringify(deadlineItem.location)}</Text>
      <Text>type: {JSON.stringify(deadlineItem.type)}</Text> */}
    </SafeAreaView>
  );
};

export default EditDeadline;

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
    paddingLeft: 10,
  },
});
