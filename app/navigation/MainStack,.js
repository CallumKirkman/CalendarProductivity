import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Test from "../screens/main/Test";
import Timetable from "../screens/main/Timetable";
import Events from "../screens/main/Events";
import EditEvent from "../screens/main/EditEvent";
import EditDeadline from "../screens/main/EditDeadline";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="EditEvent" component={EditEvent} />
        <Stack.Screen name="EditDeadline" component={EditDeadline} />
        <Stack.Screen name="Timetable" component={Timetable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
