import { genTimeBlock } from "react-native-timetable";

export default [
  {
    title: "Advanced Development",
    startTime: genTimeBlock("MON", 14),
    endTime: genTimeBlock("MON", 16),
    location: "P225",
    extra_descriptions: ["Lab"],
  },
  {
    title: "Software Q&T",
    startTime: genTimeBlock("MON", 18),
    endTime: genTimeBlock("MON", 19),
    location: "Lawrence",
    extra_descriptions: ["Lecture"],
  },
  {
    title: "Advanced Development",
    startTime: genTimeBlock("TUE", 10),
    endTime: genTimeBlock("TUE", 12),
    location: "Lawrence",
    extra_descriptions: ["Lecture"],
  },
  {
    title: "Ubiquitous Computing",
    startTime: genTimeBlock("TUE", 16),
    endTime: genTimeBlock("TUE", 18),
    location: "P221",
    extra_descriptions: ["Lab"],
  },
  {
    title: "Advanced Development",
    startTime: genTimeBlock("TUE", 18),
    endTime: genTimeBlock("TUE", 19),
    location: "P227",
    extra_descriptions: ["Lab"],
  },
  {
    title: "Individual Project",
    startTime: genTimeBlock("WED", 12),
    endTime: genTimeBlock("WED", 14),
    location: "KG01",
    extra_descriptions: ["Lecture"],
  },
  {
    title: "Ubiquitous Computing",
    startTime: genTimeBlock("WED", 14),
    endTime: genTimeBlock("WED", 16),
    location: "P235",
    extra_descriptions: ["Lab"],
  },
  {
    title: "Ubiquitous Computing",
    startTime: genTimeBlock("THU", 11),
    endTime: genTimeBlock("THU", 12),
    location: "F112",
    extra_descriptions: ["Seminar"],
  },
];
