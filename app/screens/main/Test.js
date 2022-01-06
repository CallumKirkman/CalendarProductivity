import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import eventsData from "../../components/eventsData";
import deadlinesData from "../../components/deadlinesData";

export default function App() {
  const EVENTS_KEY = "@events_key";
  const DEADLINES_KEY = "@deadlines_key";

  const [data, setData] = useState("");

  const saveEventsArray = async () => {
    try {
      const jsonValue = JSON.stringify(eventsData);
      await AsyncStorage.setItem(EVENTS_KEY, jsonValue);

      alert("Data successfully saved");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  const readEventsArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);
      let jsonList = [];

      if (jsonValue !== null) {
        for (var i = 0; i < eventsData.length; i++) {
          jsonList.push(eventsData[i]);
        }

        console.log(jsonList);
        // setData(jsonList);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setData("");
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  const sendData = () => {
    if (!eventsData) return;
    saveEventsArray(eventsData);
    setData("");
    readEventsArray();
  };

  useEffect(() => {
    readEventsArray();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text> {data ? `${data}` : "No data to display!"} </Text>

        <TouchableOpacity onPress={sendData}>
          <Text>Set data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearStorage}>
          <Text>Clear data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const saveData = async () => {
//   try {
//     await AsyncStorage.setItem(STORAGE_KEY, data);

//     alert("Data successfully saved");
//   } catch (e) {
//     alert("Failed to save the data to the storage");
//   }
// };
// const readData = async () => {
//   try {
//     const value = await AsyncStorage.getItem(STORAGE_KEY);

//     if (value !== null) {
//       setData(value);
//     }
//   } catch (e) {
//     alert("Failed to fetch the data from storage");
//   }
// };
