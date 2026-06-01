const { createDefaultPreset } = require("ts-jest");

module.exports = {
  ...createDefaultPreset(),
  testEnvironment: "node",
  transform: createDefaultPreset().transform,
  moduleFileExtensions: ["ts", "js"],
};