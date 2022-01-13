import Colour from "../static/Colour";

export default [
  {
    id: 1,
    description: "Ubiquitous Computing",
    startDate: new Date(2022, 1, 14, 12, 0),
    endDate: new Date(2022, 1, 14, 12, 30),
    color: Colour.black,
    location: "Exam building",
    type: "Coursework",
  },
  {
    id: 2,
    description: "Advanced Development",
    startDate: new Date(2022, 1, 16, 14, 0),
    endDate: new Date(2022, 1, 16, 16, 30),
    color: Colour.black,
    location: "Exam building",
    type: "Assessment",
  },
  {
    id: 3,
    description: "Software Q&T",
    startDate: new Date(2022, 1, 18, 9, 30),
    endDate: new Date(2022, 1, 18, 12, 0),
    color: Colour.black,
    location: "Exam building",
    type: "Assessment",
  },
  // {
  //   color: "#000000",
  //   description: "Test deadline",
  //   startDate: new Date(2022, 1, 14, 14, 0),
  //   endDate: new Date(2022, 1, 14, 15, 0),
  //   // endDate: "2022-01-14T17:00:00.000Z",
  //   id: 4,
  //   location: "location",
  //   // startDate: "2022-01-14T16:00:00.000Z",
  //   type: "type",
  // },
];
