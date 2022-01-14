import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, Button } from "react-native";

import writeEvents from "../../components/WriteEvents";

import { createFixedWeekDate } from "react-native-week-view";

import styles from "../../static/Styles";
import Colour from "../../static/Colour";

const EditEvent = ({ route, navigation }) => {
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

  if (route.params) {
    // console.log("Got params!");
    paramsFound = true;
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
        writeEvents(localEvents);
        navigation.push("Events");
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

        writeEvents(entry);
        navigation.push("Events");
      }
    } else {
      alert("Please fill out all forms");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.maintitle}>Add Event (week date)</Text>
      <Button title="Back" color={Colour.blue} onPress={eventsNav} />
      <TextInput
        style={styles.input}
        onChangeText={onDescriptionChange}
        value={description}
        placeholder="Description"
        type="text"
        onSubmitEditing={submitEvent}
      />
      <View style={styles.dateView}>
        <Text style={styles.startTitle}>Start Day:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onStartDayChange}
          value={startDay}
          placeholder=" Day "
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
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onStartMinuteChange}
          value={startMinute}
          placeholder="Minute"
          type="date"
          onSubmitEditing={submitEvent}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.dateView}>
        <Text style={styles.endTitle}>End Day:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onEndDayChange}
          value={endDay}
          placeholder=" Day "
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
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onEndMinuteChange}
          value={endMinute}
          placeholder="Minute"
          type="date"
          onSubmitEditing={submitEvent}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={{
          height: 40,
          marginVertical: 15,
          borderWidth: 1,
          // paddingHorizontal: 5,
          backgroundColor: colour,
        }}
        onChangeText={onColourChange}
        value={colour}
        placeholder="Colour"
        type="color"
        onSubmitEditing={submitEvent}
        autoCapitalize="none"
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
      <Button title="Submit" color={Colour.green} onPress={submitEvent} />
    </SafeAreaView>
  );
};

export default EditEvent;
