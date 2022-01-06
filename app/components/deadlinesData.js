import { genTimeBlock } from "react-native-timetable";

export default [
  {
    title: "Ubiquitous Computing",
    startTime: new Date(2022, 1, 14, 12, 0),
    endTime: new Date(2022, 1, 14, 12, 30),
    location: "Exam building",
    extra_descriptions: ["Coursework"],
  },
  {
    title: "Advanced Development",
    startTime: new Date(2022, 1, 17, 14, 0),
    endTime: new Date(2022, 1, 14, 16, 30),
    location: "Exam building",
    extra_descriptions: ["Assessment"],
  },
  {
    title: "Software Q&T",
    startTime: new Date(2022, 1, 20, 14, 0),
    endTime: new Date(2022, 1, 20, 16, 30),
    location: "Exam building",
    extra_descriptions: ["Assessment"],
  },
];

// {
//   title: "Advanced Development",
//   startTime: genTimeBlock("TUE", 10),
//   endTime: genTimeBlock("TUE", 12),
//   location: "Lawrence",
//   extra_descriptions: ["Lecture"],
// },
