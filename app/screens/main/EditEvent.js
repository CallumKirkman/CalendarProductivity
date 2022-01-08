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

const EditEvent = ({ route, navigation }) => {
  const { eventTest } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{eventTest}</Text>
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
});
