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
  }
}

module.exports = { DeviceManagementStack };