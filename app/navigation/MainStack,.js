import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Timetable from "../screens/main/Timetable";
import Events from "../screens/main/Events";
import AddEvent from "../screens/main/AddEvent";
import AddDeadline from "../screens/main/AddDeadline";
import Suggestion from "../components/Suggestion";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EditEvent" component={AddEvent} />
        <Stack.Screen name="EditDeadline" component={AddDeadline} />
        <Stack.Screen name="Timetable" component={Timetable} />
        <Stack.Screen name="Suggestion" component={Suggestion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
