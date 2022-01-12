import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Pressable,
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

const Events = ({ navigation }) => {
  const [localEvents, setLocalEvents] = useState([]);
  const [localDeadlines, setLocalDeadlines] = useState([]);

  const [eventId, setEventId] = useState(null);
  const [deadlineId, setDeadlineId] = useState(null);

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

  const timetableNav = () => {
    navigation.push("Suggestion");
  };

  const writeOld = () => {
    writeEvents(EventsData);
    writeDeadlines(DeadlinesData);
    logData();
  };

  const editSleepWake = () => {
    alert("Sleep wake");
    // navigation.navigate("SleepWake", {});
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
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
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
    submitBoolean = false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtons}>
        <Button title="Add deadline" color="red" onPress={addDeadline} />
        <Button title="Edit Sleep/Wake" color="blue" onPress={editSleepWake} />
        <Button title="Add event" color="red" onPress={addEvent} />
      </View>

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
        <Button title="Write Old" color="green" onPress={writeOld} />
        <Button
          title="Submit"
          disabled={submitBoolean}
          color="blue"
          onPress={timetableNav}
        />
        <Button title="Clear" color="red" onPress={clearStorage} />
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
});
