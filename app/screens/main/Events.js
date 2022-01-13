import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
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
// import readData from "../../components/readData";
import readEvents from "../../components/ReadEvents";
import readDeadlines from "../../components/ReadDeadlines";
import Colour from "../../static/Colour";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EventsData from "../../components/EventsData";
import DeadlinesData from "../../components/DeadlinesData";
import writeRequirements from "../../components/WriteRequirements";

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
    // logEvents();
    // logDeadlines();
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
    // alert("Add event");
    navigation.navigate("EditEvent", { localEvents });
  };

  const addDeadline = () => {
    // alert("Add deadline");
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

      // console.log(personalRequirements);
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
    const backgroundColour =
      item.id === eventId ? Colour.darkGray : Colour.lightGray;
    const colour = item.id === eventId ? Colour.white : Colour.black;

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
      item.id === deadlineId ? Colour.darkGray : Colour.lightGray;
    const colour = item.id === deadlineId ? Colour.white : Colour.black;

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
    //&& localDeadlines.length > 0
    submitBoolean = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtons}>
        <Button title="Add deadline" color="red" onPress={addDeadline} />
        <Button
          title="Edit Sleep/Wake"
          color="blue"
          onPress={() => setModalVisible(true)}
        />
        <Button title="Add event" color="red" onPress={addEvent} />
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
                style={styles.input}
                onChangeText={onWakeTimeChange}
                value={wakeTime}
                placeholder="8"
                type="text"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.rowView}>
              <Text style={styles.inputText}>Sleep time</Text>
              <TextInput
                style={styles.input}
                onChangeText={onSleepTimeChange}
                value={sleepTime}
                placeholder="23"
                type="text"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.rowView}>
              <Text style={styles.inputText}>Break hour</Text>
              <TextInput
                style={styles.input}
                onChangeText={onRestTimeChange}
                value={restTime}
                placeholder="1"
                type="text"
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Submit"
              color="blue"
              onPress={submitRequirements}
            ></Button>
            <Button
              title="Close"
              color="red"
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

      <Button title="Dummy data" color="green" onPress={writeDummy} />
      <View style={styles.topButtons}>
        <Button title="Clear" color="red" onPress={clearStorage} />
        <Button
          title="Submit"
          disabled={submitBoolean}
          color="blue"
          onPress={timetableNav}
        />
      </View>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 15,
    // backgroundColor: Colour.darkGray,
  },
  topButtons: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "purple",
  },
  topView: {
    flex: 1,
    marginTop: 5,
    // backgroundColor: Colour.red,
  },
  bottomView: {
    flex: 1,
    marginTop: 20,
    // backgroundColor: Colour.red,
  },
  headline: {
    paddingTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    // backgroundColor: "yellow",
  },
  item: {
    padding: 5,
    marginVertical: 8,
    borderRadius: 10,
    color: "red",
  },
  description: {
    fontSize: 18,
  },
  listEmpty: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 70,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputText: {
    paddingTop: 22,
    padding: 5,
  },
  input: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "purple",
  },
});
