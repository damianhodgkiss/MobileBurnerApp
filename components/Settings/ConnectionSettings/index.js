import * as React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet } from 'react-native';
import SettingsScreen from '../SettingsScreen';

const ConnectionDetails = ({ state, navigation }) => {
  let settings = null;

  const data = [
    {
      type: 'SECTION',
      header: 'MQTT Broker'.toUpperCase(),
      rows: [
        {
          title: 'Host',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Host', setting: 'MQTTClientHost', value: state.get('MQTTClientHost') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('MQTTClientHost')}
            </Text>
          ),
        },
        {
          title: 'Port',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Port', setting: 'MQTTClientPort', value: state.get('MQTTClientPort') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('MQTTClientPort')}
            </Text>
          ),
        },
        {
          title: 'Topic Prefix',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Topic Prefix', setting: 'MQTTClientTopicPrefix', value: state.get('MQTTClientTopicPrefix') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('MQTTClientTopicPrefix')}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Authentication'.toUpperCase(),
      rows: [
        {
          title: 'Username',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Username', setting: 'MQTTClientUsername', value: state.get('MQTTClientUsername') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('MQTTClientUsername') || 'Not set'}
            </Text>
          ),
        },
        {
          title: 'Password',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Password', setting: 'MQTTClientPassword', value: state.get('MQTTClientPassword') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('MQTTClientPassword') ? '********' : 'Not set'}
            </Text>
          ),
        },
      ],
    },
  ];

  return (
    <SettingsScreen set={c => settings = c} data={data} />
  );
}

const mapStateToProps = (state) => ({
  state: state.state,
});

export default connect(mapStateToProps, {})(ConnectionDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
