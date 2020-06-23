import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import SettingsScreen from '../SettingsScreen';

const SystemSettings = ({ status }) => {
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
            options: {
              0: 'Celcius',
              1: 'Fahrenheit',
            },
          }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {temperatureModes[status.get('TempMode')]}
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
          title: 'Current Input Voltage',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('inputVoltage')}V
            </Text>
          ),
        },
        {
          title: 'Low Voltage Cutout',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Low Voltage Cutout', setting: 'LowVoltCutout', value: status.get('LowVoltCutout') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('LowVoltCutout') === 0 ? 'Off' : `${status.get('LowVoltCutout')}V`}
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

export default connect(mapStateToProps, {})(SystemSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
