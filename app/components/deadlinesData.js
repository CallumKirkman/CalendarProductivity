import Colour from "../static/Colour";

export default [
  {
    id: 1,
    description: "Ubiquitous Computing",
    startDate: new Date(2022, 0, 14, 12, 0),
    endDate: new Date(2022, 0, 14, 12, 30),
    color: Colour.black,
    location: "Exam building",
    type: "Coursework",
  },
  {
    id: 2,
    description: "Advanced Development",
    startDate: new Date(2022, 0, 17, 14, 0),
    endDate: new Date(2022, 0, 17, 16, 30),
    color: Colour.black,
    location: "Exam building",
    type: "Assessment",
  },
  {
    id: 3,
    description: "Software Q&T",
    startDate: new Date(2022, 0, 20, 14, 0),
    endDate: new Date(2022, 0, 20, 16, 30),
    color: Colour.black,
    location: "Exam building",
    type: "Assessment",
  },
  // {
  //   color: "#000000",
  //   description: "Test deadline",
  //   startDate: new Date(2022, 0, 14, 14, 0),
  //   endDate: new Date(2022, 0, 14, 15, 0),
  //   // endDate: "2022-01-14T17:00:00.000Z",
  //   id: 4,
  //   location: "location",
  //   // startDate: "2022-01-14T16:00:00.000Z",
  //   type: "type",
  // },
];
