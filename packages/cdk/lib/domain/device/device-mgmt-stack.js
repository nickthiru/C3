const { Stack } = require("aws-cdk-lib");
const { DomainWorkflowFactory } = require("../../construct/domain-workflow-factory.js");


// Relative to the DomainWorkflowFactory class location
const domainSourceFilesFolderLocation = "../../src/domain/device"
const packageLockJsonFileLocation = "../../../../package-lock.json";


// External data
const domainWorkflows = [
  {
    workflow: {
      name: "ProvisionDeviceWorkflow",
      description: ""
    },
    triggerEvent: {
      name: "ProvisionDeviceRequested",
      description: "Request from end user to provision devices",
    },
    outputEvent: {
      name: "ProvisionDeviceWorkflowCompleted",
      description: "Completed provisioning of devices",
      mustSendToWebClient: true
    }
  }
];


class DeviceManagementStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { webSocketToWebClientRouteQueue } = props;


    domainWorkflows.forEach(domainWorkflow => {

      const triggerEvent = domainWorkflow.triggerEvent.name;
      const workflow = domainWorkflow.workflow.name;
      const outputEvent = domainWorkflow.outputEvent.name;
      const mustSendOutputEventToWebClient = domainWorkflow.outputEvent.mustSendToWebClient;

      new DomainWorkflowFactory(this, `${workflow}DomainWorkflowFactory`, {
        triggerEvent,
        workflow,
        outputEvent,
        mustSendOutputEventToWebClient,
        webSocketToWebClientRouteQueue,
        domainSourceFilesFolderLocation,
        packageLockJsonFileLocation
      })
    });

    // new DomainWorkflowFactory(this, "DomainWorkflowFactory", {
    //   webSocketToWebClientRouteQueue,
    //   domainSourceFilesLocation,
    //   domainName,
    //   packageLockJsonFile
    // });


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