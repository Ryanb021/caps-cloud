'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const { Consumer } = require('sqs-consumer');
const sns = new AWS.SNS();
const queueUrl = 'https://sqs.us-west-2.amazonaws.com/642529365533/PickupQueue.fifo'
const order = { orderId: 45664, customer: "Bruce Wayne", vendorUrl: queueUrl}
const pickupTopic = 'arn:aws:sns:us-west-2:642529365533:pickup.fifo';

const payload = {
  MessageGroupId: '1',
  Message: JSON.stringify(order),
  TopicArn: pickupTopic
}

setInterval(() => {sns.publish(payload).promise()
.then(data => {
  console.log("Order sent", data);
})
.catch((e) => {
  console.log('SNS vendor error: ', e);
})}, 5000);

const app = Consumer.create({
  region: 'us-west-2',
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/642529365533/PickupQueue.fifo',
  handleMessage: async (order) => {
    let data = JSON.parse(order.Body);
    console.log('Vendor received package', data);
  },
});

app.start();
