import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import SevenSegmentDisplay, { segmentMap } from 'rn-seven-segment-display';
import Button from './Button';

const RemoteControl = ({ status }) => {
  const { TempCurrent } = status;

  return (
    <View style={styles.container}>
      <View style={styles.lcd}>
        <InsetShadow>
          <View flexDirection="row">
            <Text style={styles.temperature}>{status.get('TempCurrent')}</Text>
          </View>
        </InsetShadow>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button label="Off" />
        <Button label="On" />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  status: state.state,
});

export default connect(mapStateToProps, {})(RemoteControl);

const styles = StyleSheet.create({
  temperature: {
    color: 'rgb(107,166,216)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  background: {
    borderWidth: 1,
    flex: 1,
  },
  lcd: {
    backgroundColor: 'rgb(16,91,248)',
    height: 150,
  },
  paragraph: {
    width: 150,
    padding: 24,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
