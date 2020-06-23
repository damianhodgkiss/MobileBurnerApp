import * as React from 'react';
import { connect } from 'react-redux';
import { TextInput, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';

const TextRow = () => {
  return (
    <TextInput editable>xx</TextInput>
  );
}

const BrokerHost = ({ status }) => {
  const data = [
    {
      type: 'SECTION',
      header: 'MQTT Broker'.toUpperCase(),
      rows: [
        {
          title: TextRow(),
          showDisclosureIndicator: false,
        },
      ],
    }
  ];
    
  return (
    <View style={styles.container}>
      <SettingsScreen style={{ paddingTop: 20 }} data={data} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  status: state.state,
});

export default connect(mapStateToProps, {})(BrokerHost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
