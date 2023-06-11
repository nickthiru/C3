Feature: Map
  As a operations staff member
  I would like to view a map
  To vizualize all the devices in the system and their respective data

Background:
  Given a websocket connection has been made
  # Setup WebSocket connection in client
  #   Create websocket client
  #     Import websocket lib
  #     Instantiate client with WebSocket API url
  #     Add event listeners
  #       onOpen: output 'connected status'
  #       onMessage: Call 'messageProcessor'

  #   messageProcessor(data)
  #     Check and/or do anything with the data?
  #     Call the map function to update the source

  # Setup WebSocket connection in AWS
  #   Setup Lambdas
  #     onConnect Lambda
  #       Save connection ID in SSM
  #     onMessage Lambda
  #       Format outgoing data to suit frontend application
  #       Send data to client

  #   Setup API Gateway
  #     Create WebSocket API
  #       Add onConnect route with onConnect Lambda
  #       Add onMessage route with onMessage Lambda

  # Publish IoT data from IoT Core MQTT broker to client
  #   Setup IoT Core
  #     Create Rule to invoke onMessage Lambda when MQTT sensor data arrives

  And the user is logged in

Scenario: On login, display map with markers representing devices
  Then they should see a map displaying all the devices in the system using markers
  # AWS
  #   Create a GeoJson file in S3
  #   Create an API Gateway endpoint that fetches the GeoJson file

  # Frontend
  #   After loading the map (map.on("load")), fetch the GeoJson file
  #   Convert the GeoJson file to JS object (response.json())
  #   Call map.addSource() and pass in the JS object, Note: It's possible to
  #     pass in the JS object to map.addSource() without having to convert to JSON first

Scenario: Display device data
  When the mouse hovers over a circle
  Then the device data should be displayed in details pane

Scenario: Display real-time device data
  When a device's latest data is received
  # Update the GeoJson file in S3 
  # Push device data to frontend using "onMessage" Lambda
  Then the latest device data should be displayed in details pane
  # Search JS object for the device using the deviceID
  # Replace the previous data with the latest data
  # Call map.getSource(source).setData(JS object)

Scenario: Display a new marker for a newly onboarded device
  Given a map with markers of the current devices is displayed
  When a new device is onboarded
  # AWS
  #   Add device to Device Registry
  #   Update the GeoJson file in S3
  #   Push device data to frontend
  Then the map should display the marker for the new device
  # Update JS object e.g. data.features.push(new device object)
  # Call map.getSource(source).setData(JS object)

Scenario: Send alert when GPS location of device changes
  Given the GPS location in the Device Registry
  # When onboarding any device, save the GPS coordinates in Device Registry
  When the GPS in the payload of device message does not fall within the acceptable range
  Then send an alert