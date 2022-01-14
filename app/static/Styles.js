import { StyleSheet } from "react-native";
import Colour from "./Colour";

export default StyleSheet.create({
  // SHARED
  container: {
    flex: 1,
    paddingTop: 40,
    margin: 15,
  },
  input: {
    height: 40,
    marginVertical: 15,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  topButtons: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // EVENTS
  topView: {
    flex: 1,
    marginTop: 5,
  },
  bottomView: {
    flex: 1,
    marginTop: 20,
  },
  headline: {
    paddingTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  item: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
    // color: Colour.red,
  },
  description: {
    fontSize: 20,
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
    backgroundColor: Colour.white,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: Colour.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: Colour.black,
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
  modalInput: {
    height: 40,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  // TIMETABLE
  timetableContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: Colour.offWhite,
  },
  header: {
    backgroundColor: Colour.blue,
    borderColor: Colour.black,
  },
  headerText: {
    color: Colour.white,
  },
  hourText: {
    color: Colour.black,
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: Colour.black,
  },

  // ADD EVENT & ADD DEADLINE
  maintitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  startTitle: {
    paddingTop: 25,
    // paddingLeft: 10,
  },
  endTitle: {
    paddingTop: 25,
    // paddingLeft: 10,
    marginRight: 7,
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
