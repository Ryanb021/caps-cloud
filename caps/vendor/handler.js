const { SendMessageCommand } = require('@aws-sdk/client-sqs');
const { sqsClient, QUEUES } =  require('../utility');
const Chance = require('chance');
const chance = new Chance;

const store = 'Gotham City Store';

async function sendPickup() {
  const payload = {
    store,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  
  console.log('Vendor requests for order pickup', payload);

  try{
    const message = await sqsClient.send(
      new SendMessageCommand({
        MessageBody: JSON.stringify(payload),
        MessageGroupId: store,
        QueueUrl: QUEUES.pickup,
      }),
    );

    console.log('Vendor sent pickup order request', message.MessageId);
    return message;
  } catch (e){
    console.error('Failed to send the pickup message', e);
  }
}

function startVendor(){
  setInterval(() => {
    sendPickup();
  }, 5000);
}

module.exports = startVendor;
