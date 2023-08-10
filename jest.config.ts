/* eslint-disable */
"use strict";

export default {
  displayName: "check-length",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
};
