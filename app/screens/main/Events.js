import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";

import writeEvents from "../../components/WriteEvents";
import writeDeadlines from "../../components/WriteDeadlines";
import readEvents from "../../components/ReadEvents";
import readDeadlines from "../../components/ReadDeadlines";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EventsData from "../../components/EventsData";
import DeadlinesData from "../../components/DeadlinesData";
import writeRequirements from "../../components/WriteRequirements";

import Colour from "../../static/Colour";
import styles from "../../static/Styles";

const Events = ({ navigation }) => {
  const [localEvents, setLocalEvents] = useState([]);
  const [localDeadlines, setLocalDeadlines] = useState([]);

  const [eventId, setEventId] = useState(null);
  const [deadlineId, setDeadlineId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [wakeTime, onWakeTimeChange] = useState("");
  const [sleepTime, onSleepTimeChange] = useState("");
  const [restTime, onRestTimeChange] = useState("");

  useEffect(() => {
    logData();
  }, []);

  const logData = () => {
    readEvents().then((events) => {
      // console.log(
      //   "Local Events -----------------------------------------------------------------"
      // );
      // console.log(events);

      setLocalEvents(events);
    });

    readDeadlines().then((deadlines) => {
      // console.log(
      //   "Local Deadlines -----------------------------------------------------------------"
      // );
      // console.log(deadlines);

      setLocalDeadlines(deadlines);
    });
  };

  const timetableNav = () => {
    navigation.push("Suggestion");
  };

  const writeDummy = () => {
    writeEvents(EventsData);
    writeDeadlines(DeadlinesData);
    logData();
  };

  const addEvent = () => {
    navigation.navigate("EditEvent", { localEvents });
  };

  const addDeadline = () => {
    navigation.navigate("EditDeadline", { localDeadlines });
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setLocalEvents("");
      setLocalDeadlines("");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  const submitRequirements = () => {
    if (wakeTime && sleepTime && restTime != "") {
      if (modalVisible) {
        setModalVisible(!modalVisible);
      }

      let personalRequirements = [];
      personalRequirements.push(wakeTime);
      personalRequirements.push(sleepTime);
      personalRequirements.push(restTime);

      writeRequirements(personalRequirements);
    } else {
      alert("Please fill out all forms");
    }
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.description, textColor]}>
        {item.description} - {item.type}
      </Text>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }) => {
    const backgroundColour = item.id === eventId ? Colour.blue : Colour.white;
    const colour = item.id === eventId ? Colour.white : Colour.blue;

    return (
      <Item
        item={item}
        onPress={() => {
          setEventId(item.id);
          navigation.navigate("EditEvent", { item, localEvents });
        }}
        backgroundColor={{ backgroundColor: backgroundColour }}
        textColor={{ color: colour }}
      />
    );
  };

  const renderDeadlineItem = ({ item }) => {
    const backgroundColour =
      item.id === deadlineId ? Colour.blue : Colour.white;
    const colour = item.id === deadlineId ? Colour.white : Colour.blue;

    return (
      <Item
        item={item}
        onPress={() => {
          setDeadlineId(item.id);
          navigation.navigate("EditDeadline", { item, localDeadlines });
        }}
        backgroundColor={{ backgroundColor: backgroundColour }}
        textColor={{ color: colour }}
      />
    );
  };

  let submitBoolean = true;
  if (localEvents.length > 0) {
    submitBoolean = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtons}>
        <Button title="Add deadline" color={Colour.red} onPress={addDeadline} />
        <Button
          title="Edit Sleep/Wake"
          color={Colour.blue}
          onPress={() => setModalVisible(true)}
        />
        <Button title="Add event" color={Colour.red} onPress={addEvent} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Persoanl requirements</Text>
            <View style={styles.rowView}>
              <Text style={styles.inputText}>Wake time</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={onWakeTimeChange}
                value={wakeTime}
                placeholder="8"
                placeholderTextColor={Colour.mediumGray}
                type="text"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.rowView}>
              <Text style={styles.inputText}>Sleep time</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={onSleepTimeChange}
                value={sleepTime}
                placeholder="23"
                placeholderTextColor={Colour.mediumGray}
                type="text"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.rowView}>
              <Text style={styles.inputText}>Break hour</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={onRestTimeChange}
                value={restTime}
                placeholder="1"
                placeholderTextColor={Colour.mediumGray}
                type="text"
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Submit"
              color={Colour.blue}
              onPress={submitRequirements}
            ></Button>
            <Button
              title="Close"
              color={Colour.red}
              onPress={() => setModalVisible(false)}
            ></Button>
          </View>
        </View>
      </Modal>

      <View style={styles.topView}>
        <Text style={styles.headline}>Events</Text>
        <FlatList
          data={localEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          extraData={eventId}
          ListEmptyComponent={
            <Text style={styles.listEmpty}>This list is currently empty</Text>
          }
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.headline}>Deadlines</Text>
        <FlatList
          data={localDeadlines}
          renderItem={renderDeadlineItem}
          keyExtractor={(item) => item.id}
          extraData={deadlineId}
          ListEmptyComponent={
            <Text style={styles.listEmpty}>This list is currently empty</Text>
          }
        />
      </View>

      <View style={styles.topButtons}>
        <Button title="Clear" color={Colour.red} onPress={clearStorage} />
        {/* Dummy data for testing purposes to save time */}
        <Button title="Dummy data" color={Colour.green} onPress={writeDummy} />
        <Button
          title="Submit"
          disabled={submitBoolean}
          color={Colour.blue}
          onPress={timetableNav}
        />
      </View>
    </SafeAreaView>
  );
};

export default Events;
