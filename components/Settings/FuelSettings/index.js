import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import SettingsScreen from '../SettingsScreen';

const FuelSettings = ({ status }) => {
  let settings = null;

  const data = [
    {
      type: 'SECTION',
      header: 'Pump Settings'.toUpperCase(),
      rows: [
        {
          title: 'Pump Min',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Pump Min', setting: 'PumpMin', value: status.get('PumpMin') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('PumpMin')} Hz
            </Text>
          ),
        },
        {
          title: 'Pump Max',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Pump Max', setting: 'PumpMax', value: status.get('PumpMax') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('PumpMax')} Hz
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Fan Settings'.toUpperCase(),
      rows: [
        {
          title: 'Fan Min',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Fan Min', setting: 'FanMin', value: status.get('FanMin') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('FanMin')} RPM
            </Text>
          ),
        },
        {
          title: 'Fan Max',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Fan Max', setting: 'FanMax', value: status.get('FanMax') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('FanMax')} RPM
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

export default connect(mapStateToProps, {})(FuelSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
