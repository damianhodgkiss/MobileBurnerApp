import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import SettingsScreen from '../SettingsScreen';

const formatDateTime = (str) => {
  if (!str) return new Date();

  const dateParts = str.split('/');
  const timeParts = dateParts[2].split(' ')[1].split(':');
  dateParts[2] = dateParts[2].split(' ')[0];
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
};

const SystemSettings = ({ state }) => {
  const temperatureModes = ['Celcius', 'Fahrenheit'];
  let settings = null;

  const data = [
    {
      type: 'SECTION',
      header: 'Temperature'.toUpperCase(),
      rows: [
        {
          title: 'Temperature Format',
          showDisclosureIndicator: true,
          onPress: () => settings.setPicker({
            setting: 'TempMode',
            value: state.get('TempMode'),
            options: {
              0: 'Celcius',
              1: 'Fahrenheit',
            },
          }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {temperatureModes[state.get('TempMode')]}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Voltage'.toUpperCase(),
      rows: [
        {
          title: 'System Voltage',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('SystemVoltage')}V
            </Text>
          ),
        },
        {
          title: 'Current Input Voltage',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('InputVoltage')}V
            </Text>
          ),
        },
        {
          title: 'Low Voltage Cutout',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Low Voltage Cutout', setting: 'LowVoltCutout', value: state.get('LowVoltCutout') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {state.get('LowVoltCutout') === 0 ? 'Off' : `${state.get('LowVoltCutout')}V`}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Date & Time'.toUpperCase(),
      rows: [
        {
          title: 'Local',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {(new Date()).toLocaleString()}
            </Text>
          ),
        },
        {
          title: 'Afterburner',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {formatDateTime(state.get('DateTime')).toLocaleString()}
            </Text>
          ),
        },
      ],
    }
  ];
    
  return (
    <SettingsScreen set={c => settings = c} data={data} />
  );
}

const mapStateToProps = (state) => ({
  state: state.state,
});

export default connect(mapStateToProps, {})(SystemSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
