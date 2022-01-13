import AsyncStorage from "@react-native-async-storage/async-storage";

const REQUIREMENTS_KEY = "@requirements_key";

const writeRequirements = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(REQUIREMENTS_KEY, jsonValue);

    // alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

export default writeRequirements;
