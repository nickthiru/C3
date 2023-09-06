const { Stack } = require("aws-cdk-lib");
// const { DomainWorkflowFactory } = require("../../construct/domain-workflow-factory.js");
const { ProvisionDeviceWorkflowStack } = require("./workflow/provision-device-workflow-stack.js");


// Relative to the DomainWorkflowFactory
const domainSourceFilesLocation = "../../../../src/domain/device"

const domainName = "DeviceManagement";

const packageLockJsonFile = "../../../../../../package-lock.json";

// const domainEventsAndWorkflows = [
//   {
//     workflowTriggerEvent: "ProvisionDeviceRequested",
//     workflowTriggerEventDescription: "Request from end user to provision devices",
//     workflowCommand: "ProvisionDeviceWorkflow",
//     workflowOutputEvent: "ProvisionDeviceWorkflowCompleted",
//     workflowOutputEventDescription: "Completed provisioning of devices",
//   }
// ]


class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { webSocketToWebClientRouteQueue } = props;

    new ProvisionDeviceWorkflowStack(this, "ProvisionDeviceWorkflowStack", {
      webSocketToWebClientRouteQueue,
      domainSourceFilesLocation,
      domainName,
      packageLockJsonFile
    });

    // domainEventsAndWorkflows.forEach(element => {
    //   new DomainWorkflowFactory(this, `${workflowCommand}${domainName}DomainWorkflowFactory`, {
    //     domainSourceFilesLocation: domainSourceFilesLocation,
    //     workflowTriggerEvent: element.workflowTriggerEvent,
    //     workflowTriggerEventDescription: element.workflowTriggerEventDescription,
    //     workflowCommand: element.workflowCommand,
    //     workflowOutputEvent: element.workflowOutputEvent,
    //     workflowOutputEventDescription: element.workflowOutputEventDescription,
    //   })
    // });

    // domainEventsAndWorkflows.forEach((
    //   workflowTriggerEvent,
    //   workflowTriggerEventDescription,
    //   workflowCommand,
    //   workflowOutputEvent,
    //   workflowOutputEventDescription
    // ) => {
    //   new DomainWorkflowFactory(this, `${workflowCommand}${domainName}DomainWorkflowFactory`, {
    //     domainSourceFilesLocation: domainSourceFilesLocation,
    //     workflowTriggerEvent,
    //     workflowTriggerEventDescription,
    //     workflowCommand,
    //     workflowOutputEvent,
    //     workflowOutputEventDescription
    //   })
    // });
  }
}

module.exports = { DeviceManagementStack };