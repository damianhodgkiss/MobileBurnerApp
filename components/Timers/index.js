import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';

const Timers = ({ state }) => {
  const data = [
    {
      type: 'SECTION',
      header: '',
      rows: [],
    },
  ];

  for (let i = 1; i <= 14; i++) {
    data[0].rows.push({
      title: `Timer ${i}`,
      showDisclosureIndicator: true,
      renderAccessory: () => (
        <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
          {i === 1 ? 'Enabled' : 'Disabled'}
        </Text>
      ),
    });
  }
    
  return (
    <View style={styles.container}>
      <SettingsScreen style={{ paddingTop: 20 }} data={data} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  state: state.state,
});

export default connect(mapStateToProps, {})(Timers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
