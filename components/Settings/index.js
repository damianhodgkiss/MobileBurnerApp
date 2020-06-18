import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';

const Settings = ({ status }) => {
  const temperatureModes = ['Celcius', 'Fahrenheit'];

  const data = [
    {
      type: 'SECTION',
      header: 'Fuel Mixture'.toUpperCase(),
      rows: [
        {
          title: 'Pump Min',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('PumpMin')} Hz
            </Text>
          ),
        },
        {
          title: 'Pump Max',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('PumpMax')} Hz
            </Text>
          ),
        },
        {
          title: 'Fan Min',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('FanMin')} RPM
            </Text>
          ),
        },
        {
          title: 'Fan Max',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('FanMax')} RPM
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'System Settings'.toUpperCase(),
      rows: [
        {
          title: 'Temperature Format',
          showDisclosureIndicator: true,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {temperatureModes[status.get('TempMode')]}
            </Text>
          ),
        },
      ],
    },
  ];
    
  return (
    <View style={styles.container}>
      <SettingsScreen data={data} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  status: state.state,
});

export default connect(mapStateToProps, {})(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
