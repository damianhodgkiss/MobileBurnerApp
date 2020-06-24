import * as React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet } from 'react-native';
import SettingsScreen from '../SettingsScreen';

const ConnectionDetails = ({ status, navigation }) => {
  let settings = null;

  const data = [
    {
      type: 'SECTION',
      header: 'MQTT Broker'.toUpperCase(),
      rows: [
        {
          title: 'Host',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Host', setting: 'MQTTClientHost', value: status.get('MQTTClientHost') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('MQTTClientHost')}
            </Text>
          ),
        },
        {
          title: 'Port',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Port', setting: 'MQTTClientPort', value: status.get('MQTTClientPort') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('MQTTClientPort')}
            </Text>
          ),
        },
        {
          title: 'Topic Prefix',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Topic Prefix', setting: 'MQTTClientTopicPrefix', value: status.get('MQTTClientTopicPrefix') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('MQTTClientTopicPrefix')}
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
          onPress: () => settings.setPrompt({ title: 'Username', setting: 'username' }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              Not set
            </Text>
          ),
        },
        {
          title: 'Password',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Password', setting: 'password' }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              Not set
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
  status: state.state,
});

export default connect(mapStateToProps, {})(ConnectionDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
