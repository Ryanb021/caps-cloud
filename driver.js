'use strict';
const { v4: uuidv4 } = require('uuid');
const { Producer } = require('sqs-producer');
const { Consumer } = require('sqs-consumer');
const AWS_REGION = 'us-west-1';
const AWS_QUEUE_URL = 'https://sqs.us-west-2.amazonaws.com/642529365533/PickupQueue.fifo';


const producer = Producer.create({
  queueUrl: AWS_QUEUE_URL,
  region: AWS_REGION,
});

const app = Consumer.create({
  region: 'us-west-2',
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/642529365533/DeliveredQueue.fifo',
  handleMessage: async (order) => {
    let data = JSON.parse(order.Body).Message;
    console.log(data);
    let msg = JSON.parse(data);
    msg.status = 'delivered';
    console.log(msg);
    
    producer.send({
      id: uuidv4(),
      body: JSON.stringify(msg),
      delaySeconds: 5
    }).then(data => {
      console.log('SQS MESSAGE DATA: ', data);
    })
    .catch(err => {
      console.log('SQS PRODUCER ERROR: ', err);
    })
  },
});

app.start();
