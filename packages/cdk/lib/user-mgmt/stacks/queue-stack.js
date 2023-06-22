const sqs = require("aws-cdk-lib/aws-sqs");

class QueueStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    // Use managed key
    new sqs.Queue(this, 'Queue', {
      encryption: sqs.QueueEncryption.KMS_MANAGED,
    });

    // Use custom key
    const myKey = new kms.Key(this, 'Key');

    new sqs.Queue(this, 'Queue', {
      encryption: sqs.QueueEncryption.KMS,
      encryptionMasterKey: myKey,
    });

    // Use SQS managed server side encryption (SSE-SQS)
    new sqs.Queue(this, 'Queue', {
      encryption: sqs.QueueEncryption.SQS_MANAGED,
    });

    // Unencrypted queue
    new sqs.Queue(this, 'Queue', {
      encryption: sqs.QueueEncryption.UNENCRYPTED,
    });
  }
}

module.exports = { QueueStack };