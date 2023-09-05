const { Stack } = require("aws-cdk-lib");
const { DomainWorkflowFactory } = require("../../construct/domain-workflow-factory.js");


const domainSourceFilesLocation = "../../src/domain/device"

const domainEventsAndWorkflows = [
  {
    workflowTriggerEvent: "ProvisionDeviceRequested",
    workflowTriggerEventDescription: "Request from end user to provision devices",
    workflowCommand: "ProvisionDeviceWorkflow",
    workflowOutputEvent: "ProvisionDeviceWorkflowCompleted",
    workflowOutputEventDescription: "Completed provisioning of devices",
    mustSendToWebClient: true
  }
]


class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    domainEventsAndWorkflows.forEach(element => {
      new DomainWorkflowFactory(this, `${element.workflowCommand}DeviceManagementDomainFactory`, {
        domainSourceFilesLocation: domainSourceFilesLocation,
        workflowTriggerEvent: element.workflowTriggerEvent,
        workflowTriggerEventDescription: element.workflowTriggerEventDescription,
        workflowCommand: element.workflowCommand,
        workflowOutputEvent: element.workflowOutputEvent,
        workflowOutputEventDescription: element.workflowOutputEventDescription,
        mustSendToWebClient: element.mustSendToWebClient
      })
    });
  }
}

module.exports = { DeviceManagementStack };