import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
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

import AsyncStorage from "@react-native-async-storage/async-storage";

const Events = ({ navigation }) => {
  const [localEvents, setLocalEvents] = useState([]);
  const [localDeadlines, setLocalDeadlines] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    logEvents();
    logDeadlines();
    // logData();
  }, []);

  // const logData = () => {
  //   readEvents().then((events) => {
  //     // console.log(
  //     //   "Local Events -----------------------------------------------------------------"
  //     // );
  //     // console.log(events);

  //     setLocalEvents(events);
  //   });

  //   readDeadlines().then((deadlines) => {
  //     // console.log(
  //     //   "Local Deadlines -----------------------------------------------------------------"
  //     // );
  //     // console.log(deadlines);

  //     setLocalDeadlines(deadlines);
  //   });
  // };

  const logEvents = () => {
    readEvents().then((events) => {
      // console.log(
      //   "Local Events -----------------------------------------------------------------"
      // );
      // console.log(events);

      setLocalEvents(events);
    });
  };

  const logDeadlines = () => {
    readDeadlines().then((deadlines) => {
      // console.log(
      //   "Local Deadlines -----------------------------------------------------------------"
      // );
      // console.log(deadlines);

      setLocalDeadlines(deadlines);
    });
  };

  const timetableNav = () => {
    // Disable until events and deadlines
    navigation.navigate("Timetable");
  };

  const writeAll = () => {
    writeEvents();
    writeDeadlines();
  };

  const addEvent = () => {
    alert("Add event");
  };

  const addDeadline = () => {
    alert("Add deadline");
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

  const renderItem = ({ item }) => {
    const backgroundColour =
      item.id === selectedId ? Colour.darkGray : Colour.lightGray;
    const colour = item.id === selectedId ? Colour.white : Colour.black;

    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("EditEvent", { eventTest: "Test event" });

          // navigation.push("LocationTopNav", {
          //   screen: "SelectedBeach",
          //   params: { beachName: "Test" },
          // });
        }}
        backgroundColor={{ backgroundColor: backgroundColour }}
        textColor={{ color: colour }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtons}>
        <Button title="Add deadline" color="red" onPress={logDeadlines} />
        <Button title="Add event" color="red" onPress={logEvents} />
      </View>

      <View style={styles.topView}>
        <Text style={styles.headline}>Events</Text>
        <FlatList
          data={localEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          ListEmptyComponent={
            <Text style={styles.listEmpty}>This list is currently empty</Text>
          }
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.headline}>Deadlines</Text>
        <FlatList
          data={localDeadlines}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          ListEmptyComponent={
            <Text style={styles.listEmpty}>This list is currently empty</Text>
          }
        />
      </View>

      <View style={styles.topButtons}>
        <Button title="Write" color="red" onPress={writeAll} />
        <Button title="Submit" color="blue" onPress={timetableNav} />
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
