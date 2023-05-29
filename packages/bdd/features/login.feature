Feature: Login

    As an operations staff
    I would like to be ablet to login
    So that I can access the C3 app

Scenario: Succesful login
  Given I am an admin user
  When I login with my username and password
  Then I should be signed in