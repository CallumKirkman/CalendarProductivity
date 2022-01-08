import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import writeEvents from "../../components/WriteEvents";
import readEvents from "../../components/ReadEvents";
import writeDeadlines from "../../components/WriteDeadlines";
import readDeadlines from "../../components/ReadDeadlines";

const App = () => {
  const [data, setData] = useState("");

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setData("");
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  // useEffect(() => {
  //   let test = readEvents();
  // }, []);

  const logEvents = () => {
    readEvents().then((events) => {
      console.log(
        "Events -----------------------------------------------------------------"
      );
      console.log(events);
    });
  };

  const logDeadlines = () => {
    readDeadlines().then((deadlines) => {
      console.log(
        "Deadlines -----------------------------------------------------------------"
      );
      console.log(deadlines);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <Text> {data ? `${data}` : "No data to display!"} </Text> */}

        <TouchableOpacity onPress={writeEvents}>
          <Text>Write events</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logEvents}>
          <Text>Log events</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={writeDeadlines}>
          <Text>Write deadlines</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logDeadlines}>
          <Text>Log deadlines</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearStorage}>
          <Text>Clear data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

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
