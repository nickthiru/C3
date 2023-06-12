Feature: Add a new Operations staff user
  As an Operations admin
  I would like to be able to add a new user
    to the C3 app
  So that they can use the app

Scenario: Successfully add a user to Cognito User Pools
  Given a particular user is not registered
  When I add the user to the user pool
  Then I should get a success response

Scenario: Successfully login using credentials