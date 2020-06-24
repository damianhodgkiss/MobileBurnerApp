import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import SettingsScreen from '../SettingsScreen';

const ThermostatSettings = ({ state }) => {
  let settings = null;
  const thermostats = ['Direct Hz', 'Temperature'];
  const methods = ['Standard', 'Deadband', 'Linear Hz', 'Stop Start'];

  const data = [
    {
      type: 'SECTION',
      header: 'Mode'.toUpperCase(),
      rows: [
        {
          title: 'Thermostat',
          showDisclosureIndicator: true,
          onPress: () => settings.setPicker({
            setting: 'Thermostat',
            value: state.get('Thermostat'),
            options: {
              0: 'Direct Hz',
              1: 'Temperature',
            },
          }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {thermostats[state.get('Thermostat')]}
            </Text>
          ),
        },
      ],
    },{
      type: 'SECTION',
      header: 'Thermostat'.toUpperCase(),
      rows: [
        {
          title: 'Method',
          showDisclosureIndicator: true,
          onPress: () => settings.setPicker({
            setting: 'ThermostatMethod',
            value: state.get('ThermostatMethod'),
            options: {
              0: 'Standard',
              1: 'Deadband',
              2: 'Linear Hz',
              3: 'Stop Start',
            },
          }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {methods[state.get('ThermostatMethod')]}
            </Text>
          ),
        },
        {
          title: 'Window',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Window', setting: 'ThermostatWindow', value: state.get('ThermostatWindow') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {`${state.get('ThermostatWindow')}\u2103`}
            </Text>
          ),
        },
      ],
    },{
      type: 'SECTION',
      header: 'Cyclic Mode'.toUpperCase(),
      rows: [
        {
          title: 'Cyclie Mode State',
          showDisclosureIndicator: true,
          onPress: () => settings.setPicker({
            setting: 'CyclicOff',
            value: state.get('CyclicOff'),
            options: {
              0: 'Disabled',
              2: 'Enabled',
            },
          }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('CyclicOff') === 0 ? 'Disabled' : 'Enabled'}
            </Text>
          ),
        },
        {
          title: 'Start Window',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Start Window', setting: 'CyclicOn', value: state.get('CyclicOn') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {`${state.get('CyclicOn')}\u2103`} ({`${state.get('CyclicTemp') + state.get('CyclicOn')}\u2103`})
            </Text>
          ),
        },
        {
          title: 'Stop Window',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Stop Window', setting: 'CyclicOff', value: state.get('CyclicOff') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {`${state.get('CyclicOff')}\u2103`} ({`${state.get('CyclicTemp') + state.get('CyclicOff')}\u2103`})
            </Text>
          ),
        },
      ],
    },
  ];

  if (state.get('ThermostatMethod') === 0) {
    data[1].rows = data[1].rows.slice(0, 1);
  }

  if (state.get('CyclicOff') === 0) {
    data[2].rows = data[2].rows.slice(0, 1);
  }
    
  return (
    <SettingsScreen set={c => settings = c} data={data} />
  );
}

const mapStateToProps = (state) => ({
  state: state.state,
});

export default connect(mapStateToProps, {})(ThermostatSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
