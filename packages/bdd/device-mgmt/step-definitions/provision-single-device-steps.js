/*

// Domain Modeling

Event: ProvisionSingleDeviceRequested; Command: ProvisionSingleDevice, Input: ?
Command: ProvisionSingleDevice, Output: ; Event: ProvisionSingleDeviceCompleted
Event: ProvisionSingleDeviceCompleted; Command: AddDeviceToMap, Input: ?
Event: ProvisionSingleDeviceFailed; Command: ?, Input: ?

ProvisionSingleDevice workflow:
1. Create a Thing
2. Create credentials
3. Create policy
4. Attach policy to client certificate
5. Attach client certificate in the Thing Registry
6. Get credentials on to device via LoRaWAN
7. Test connection and communication between device and IoT Core

Bounded Context: Device Management

Workflow: ProvisionSingleDevice
  Triggered by: ProvisionSingleDeviceRequested event
  Primary input: ProvisionSingleDevice form
  Other input:
  Output events: ProvisionSingleDeviceCompleted
  Side effects: Send notification to admin

  Data (for validation purposes also):
  ProvisionSingleDevice form
    deviceName
      string
      mandatory
      any rules, limits, or constraints?
    deviceGroup
    attributes


// API Goals Cavassing

Who: Admin
What: Provision a single device
How: 
Inputs:
Outputs:
Goals:


// Distinguishing Actions, Calculations, and Data

*/