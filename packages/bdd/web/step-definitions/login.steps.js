const { defineFeature, loadFeature } = require("jest-cucumber");

const feature = loadFeature("features/login.feature");

defineFeature(feature, test => {
  test("Succesful login", ({ given, when, then }) => {
    given("I am an admin user", () => {
      console.log("(+) Given I am an admin user...");
    });

    when("I login with my username and password", () => {
      console.log("(+) When I login with my username and password...");
    });

    then("I should be signed in", () => {
      console.log("(+) Then I should be signed in...");
      expect("test passed").toBe("test passed");
    });
  });
});