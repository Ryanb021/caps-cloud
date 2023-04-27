'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });


const sns = new AWS.SNS();

// node index.js in terminal then 'message'
const message = process.argv[2];

const topic = 'arn:aws:sns:us-west-2:642529365533:messages.fifo';

const payload = {
  Message: message,
  TopicArn: topic
};

sns.publish(payload).promise()
.then(data => {
  console.log("Message Published!", data);
})

.catch((e) => {
  console.log('SNS message error', e);
})
