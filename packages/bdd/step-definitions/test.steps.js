const { defineFeature, loadFeature } = require("jest-cucumber");

const feature = loadFeature("features/test.feature");

defineFeature(feature, test => {
  test("Jest Cucumber Works", ({ given, when, then }) => {
    given("Something", () => {
      console.log("(+) Inside 'Given' step...");
    });

    when("I do this", () => {
      console.log("(+) Inside 'When' step...");
    });

    then("that should happen", () => {
      console.log("(+) Inside 'Then' step...");
      expect("test passed").toBe("test passed");
    });
  });
});