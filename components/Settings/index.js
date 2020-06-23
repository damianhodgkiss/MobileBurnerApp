import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Settings = ({ status, navigation }) => {
  const data = [
    {
      type: 'SECTION',
      header: ' ',
      rows: [
        {
          title: 'Connection',
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('Connection'),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Heater Settings'.toUpperCase(),
      rows: [
        {
          title: 'System',
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('System'),
        },
        {
          title: 'Fuel Mixture',
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('Fuel Mixture'),
        },
        {
          title: 'About',
          showDisclosureIndicator: true,
          onPress: () => navigation.navigate('About'),
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
