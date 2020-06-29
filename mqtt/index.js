import mqtt from '@taoqf/react-native-mqtt';
import { refreshTimers, updateTimer } from '../actions/timers';
import { refreshState, updateState } from '../actions/state';
import { updateStatus } from '../actions/status';
import { store } from '../store';

let client;

export const mqttReconnect = (existingState) => {
  const { dispatch } = store;
  const state = existingState || store.getState().state;
  const MQTTClientHost = state.get('MQTTClientHost');
  const MQTTClientPort = Number(state.get('MQTTClientPort') || 0);
  const MQTTClientUsername = state.get('MQTTClientUsername');
  const MQTTClientPassword = state.get('MQTTClientPassword');
  const MQTTClientTopicPrefix = state.get('MQTTClientTopicPrefix');
  const mqttUrl = `ws://${MQTTClientHost}:${MQTTClientPort}/mqtt`;
  
  if (client) {
    client.end(true);
  }
  client = null;

  if (!MQTTClientPort || !MQTTClientHost) {
    dispatch(updateStatus('unconfigured'));

    console.log('Warning: No MQTT url set...');
    return;
  }

  if (!MQTTClientTopicPrefix) {
    dispatch(updateStatus('unconfigured'));

    console.log('Warning: No MQTT topic prefix set...');
    return;
  }

  dispatch(updateStatus('connecting'));

  const options = {};
  if (MQTTClientUsername) {
    options.username = MQTTClientUsername;
  }

  if (MQTTClientPassword) {
    options.password = MQTTClientPassword;
  }

  console.log(`Connecting to ${mqttUrl} (${JSON.stringify(options)}) ...`);
  client = mqtt.connect(mqttUrl, options);

  client.on('connect', () => {
    client.subscribe(`${MQTTClientTopicPrefix}/JSONout`, (err) => {
    });
  
    client.subscribe(`${MQTTClientTopicPrefix}/status`, (err) => {
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
    } else if (topic.endsWith('status') && message) {
      console.log(`STATUS: ${message.toString()}`);
      dispatch(updateStatus(message.toString()));
    }
  });  

  client.on('error', (err) => {
    console.log('ERROR:', err);
  });

  client.on('offline', () => {
    console.log('OFFLINE');
    dispatch(updateStatus('offline'));
    setTimeout(() => mqttReconnect, 30e3);
  });

  client.on('reconnect', () => {
    console.log('RECONNECT');
    dispatch(updateStatus('reconnecting'));
  });
};

export const mqttSend = (msg) => {
  if (!client) return;
  
  const state = store.getState().state;
  const MQTTClientTopicPrefix = state.get('MQTTClientTopicPrefix');
  const topic = `${MQTTClientTopicPrefix}/JSONin`;

  console.log(`SEND ${topic}:`, JSON.stringify(msg));
  client.publish(topic, JSON.stringify(msg), (err) => {
    console.log('PUB!', err);
  });
};

const refresh = () => {
  const { dispatch } = store;
  dispatch(refreshState());
  dispatch(refreshTimers());
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
      break;
  }
};
