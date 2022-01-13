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
  const [startYear, onStartYearChange] = useState("");
  const [startMonth, onStartMonthChange] = useState("");
  const [startDay, onStartDayChange] = useState("");
  const [startHour, onStartHourChange] = useState("");
  const [startMinute, onStartMinuteChange] = useState("");
  const [endYear, onEndYearChange] = useState("");
  const [endMonth, onEndMonthChange] = useState("");
  const [endDay, onEndDayChange] = useState("");
  const [endHour, onEndHourChange] = useState("");
  const [endMinute, onEndMinuteChange] = useState("");
  const [colour, onColourChange] = useState("");
  const [location, onLocationChange] = useState("");
  const [type, onTypeChange] = useState("");

  let paramsFound = false;

  const createDate = (date) => {
    let int = 0;

    if (date.includes("0")) {
      int = "0" + (date - 1);
    } else {
      int = date - 1;
    }
    return int;
  };

  if (route.params) {
    // console.log("Got params!");
    paramsFound = true;
    // console.log(route.params);
  } else {
    // console.log("Params not found!");
  }

  const deadlinesNav = () => {
    navigation.navigate("Events");
  };

  const submitDeadline = () => {
    if (
      description &&
      startYear &&
      startMonth &&
      startDay &&
      startHour &&
      startMinute &&
      endYear &&
      endMonth &&
      endDay &&
      endHour &&
      endMinute &&
      colour &&
      location &&
      type != ""
    ) {
      let startM = createDate(startMonth);
      let endM = createDate(endMonth);

      let startDate = new Date(
        startYear,
        startM,
        startDay,
        startHour,
        startMinute
      );
      let endDate = new Date(endYear, endM, endDay, endHour, endMinute);

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
        navigation.push("Events");
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
        navigation.push("Events");
      }
    } else {
      alert("Please fill out all forms");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.maintitle}>Add Deadline</Text>
      <Text style={styles.maintitle}>(fixed date)</Text>
      <Button title="Back" color="blue" onPress={deadlinesNav} />
      <TextInput
        style={styles.input}
        onChangeText={onDescriptionChange}
        value={description}
        placeholder="Example name"
        type="text"
        onSubmitEditing={submitDeadline}
      />
      <View style={styles.dateView}>
        <Text style={styles.startTitle}>Start Date: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onStartYearChange}
          value={startYear}
          placeholder="YYYY"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartMonthChange}
          value={startMonth}
          placeholder="MM"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartDayChange}
          value={startDay}
          placeholder="DD"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartHourChange}
          value={startHour}
          placeholder="hh"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartMinuteChange}
          value={startMinute}
          placeholder="mm"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.dateView}>
        <Text style={styles.endTitle}>End Date: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onEndYearChange}
          value={endYear}
          placeholder="YYYY"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndMonthChange}
          value={endMonth}
          placeholder="MM"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndDayChange}
          value={endDay}
          placeholder="DD"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndHourChange}
          value={endHour}
          placeholder="hh"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndMinuteChange}
          value={endMinute}
          placeholder="mm"
          type="date"
          onSubmitEditing={submitDeadline}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={{
          height: 40,
          margin: 15,
          borderWidth: 1,
          paddingHorizontal: 5,
          backgroundColor: colour,
        }}
        onChangeText={onColourChange}
        value={colour}
        placeholder="Colour"
        type="color"
        onSubmitEditing={submitDeadline}
        autoCapitalize="none"
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
    paddingTop: 60,
    padding: 15,
    // backgroundColor: Colour.darkGray,
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  maintitle: {
    textAlign: "center",
    // padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  startTitle: {
    paddingTop: 25,
    paddingLeft: 10,
  },
  endTitle: {
    paddingTop: 25,
    paddingLeft: 10,
    marginRight: 7,
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "purple",
  },
});
