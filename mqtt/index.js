import mqtt from '@taoqf/react-native-mqtt';
import store from '../store';
import { refreshTimers, updateTimer } from '../actions/timers';
import { refreshState, updateState } from '../actions/state';
import { put, putResolve } from 'redux-saga/effects';

//const topicPrefix = 'AfterburnerA3719C';
const topicPrefix = 'AfterburnerA36F14';

console.log('connecting');
const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

export const mqttSend = (msg) => {
  const topic = `${topicPrefix}/JSONin`;

  client.publish(topic, JSON.stringify(msg), (err) => {
    console.log('PUB!', err);
  });
};

const refresh = () => {
  const { dispatch } = store;
  dispatch(refreshState());
  dispatch(refreshTimers());
  /*
  console.log('STORE:', store);
  mqttSend({ Refresh: 1 });
  mqttSend({ SQuery: 1 });
  mqttSend({ IQuery: 1 });
  mqttSend({ MQuery: 1 });
  for (let timer = 1; timer <= 14; timer++) {
    mqttSend({ TQuery: timer });
  }
  */
};

const processMessage = async (key, value) => {
  const { dispatch } = store;
  //console.log(`Processing ${key} (${value})`);
  switch(key) {
    case 'TimerStart':
      {
        const timer = value.split(' ');
        dispatch(updateTimer(parseInt(timer[0], 10), { start: timer[1] }));
      }
      break;

    case 'TimerStop':
      {
        const timer = value.split(' ');
        dispatch(updateTimer(parseInt(timer[0], 10), { stop: timer[1] }));
      }
      break;

    case 'TimerDays':
      {
        const timer = value.split(' ');
        dispatch(updateTimer(parseInt(timer[0], 10), { days: timer[1] }));
      }
      break;

    case 'TimerRepeat':
      {
        const timer = value.split(' ');
        dispatch(updateTimer(parseInt(timer[0], 10), { repeat: timer[1] }));
      }
      break;

    case 'TimerTemp':
      {
        const timer = value.split(' ');
        dispatch(updateTimer(parseInt(timer[0], 10), { temp: timer[1] }));
      }
      break;

    default:
      dispatch(updateState(key, value));
  }
};

client.on('connect', () => {
  client.subscribe(`${topicPrefix}/JSONout`, (err) => {
  });

  client.subscribe(`${topicPrefix}/status`, (err) => {
  });

  refresh();
});

client.on('message', (topic, message) => {
  if (topic.endsWith('JSONout')) {
    const json = message.toString();

    try {
      const data = JSON.parse(message.toString());
      //console.log('Afterburner!', json);

      for (const key of Object.keys(data)) {
        const value = data[key];
        processMessage(key, value);
      }

    } catch (ex) {
      console.log(`Failed: ${topic} ${ex.message}:`, json);
    }
  }
});

