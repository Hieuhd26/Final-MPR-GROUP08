import Label from "../models/label";
import Note from "../models/note";

export const LABELS = [
  new Label("l1", "React Native"),
  new Label("l2", "Final Exam"),
  new Label("l3", "Mini Project"),
  new Label("l4", "Team Work"),
  new Label("l5", "React Basic"),
  new Label("l6", "Spring Boot"),
  new Label("l7", "Hibernate"),
  new Label("l8", "Maven"),
  new Label("l9", "MySQL"),
  new Label("l10", "GIT"),
  new Label("l11", "GitLab"),
  new Label("l12", "GitHub"),
  new Label("l13", "SocketIO"),
  new Label("l14", "ORM"),
  new Label("l15", "ChatGPT"),
  new Label("l16", "Reactjs"),
  new Label("l17", "Nodemon"),
  new Label("l18", "top 1 hải dương"),
  new Label("l19", "white hat"),
];

export const COLORS = [
  "lightseagreen",
  "skyblue",
  "lightcoral",
  "lightpink",
  "lightgreen",
  "lightblue",
  "orange",
  "palegreen",
];

export const NOTES = [
  new Note(
    "n1",
    null,
    ["l1", "l2"],
    "Final Project Preparation",
    new Date("2024-5-10T12:30:00"),
    false
  ),
  new Note(
    "n2",
    COLORS[3],
    ["l3"],
    "For our mini project!",
    new Date("2024-5-10T12:35:00"),
    true
  ),
  new Note(
    "n3",
    COLORS[4],
    ["l2"],
    "Second note!",
    new Date("2024-4-20T15:30:00"),
    false
  ),
  new Note(
    "n4",
    COLORS[5],
    ["l1"],
    "Cooking",
    new Date("2024-4-20T12:25:00"),
    false
  ),
  
];

export const TRASH = [
  new Note(
    "n5",
    COLORS[0],
    ["l4"],
    "Learn React Native Navigation",
    new Date("2024-5-10T14:30:00"),
    true
  ),
  new Note(
    "n6",
    null,
    ["l4", "l2", "l1"],
    "A simple note",
    new Date("2024-5-10T14:35:00"),
    false
  ),
  new Note(
    "n7",
    COLORS[6],
    ["l1", "l2", "l3", "l4"],
    "One more note",
    new Date("2024-4-20T15:30:00"),
    false
  ),
  new Note(
    "n8",
    COLORS[6],
    ["l1", "l2", "l3", "l4"],
    "One more note",
    new Date("2024-4-20T15:30:00"),
    false
  ),
  new Note(
    "n9",
    COLORS[6],
    ["l2",],
    "Top 1 ninh giang",
    new Date("2024-6-2T15:30:00"),
    false
  ),
];
