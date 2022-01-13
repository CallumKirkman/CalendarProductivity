import React from "react";
import { LogBox } from "react-native";

import MainStack from "./app/navigation/MainStack,";

const App = () => {
  LogBox.ignoreLogs([
    "Failed prop type:",
    "Non-serializable values",
    "Each child",
    "Warning: Each child",
    "Cannot update a component",
  ]);
  return <MainStack />;
};

export default App;
