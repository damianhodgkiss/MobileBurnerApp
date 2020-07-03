import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';
import { displayTemp } from '../../../util';

const formatTime = (time) => {
  const [hour, min] = time.split(':');
  let ret = '';

  if (hour === '00')
    ret = 12;
  else if (hour < 13)
    ret = Number(hour);
  else ret = Number(hour) - 12;

  ret += ':';

  ret += min;

  if (hour < 12) ret += 'am'; else ret += 'pm';

  return ret;
};

const Timer = ({ state, timer, route }) => {
  const { id } = route.params;
  console.log('ROUTE:', id, timer);
  const data = [
    {
      type: 'SECTION',
      header: 'Time'.toUpperCase(),
      rows: [
        {
          title: 'Start',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Fan Min', setting: 'FanMin', value: state.get('FanMin') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {formatTime(timer.get('start'))}
            </Text>
          ),
        },
        {
          title: 'Stop',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Fan Min', setting: 'FanMin', value: state.get('FanMin') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {formatTime(timer.get('stop'))}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Day'.toUpperCase(),
      rows: [],
    },
    {
      type: 'SECTION',
      header: 'Settings'.toUpperCase(),
      rows: [
        {
          title: 'Temperature',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Start Window', setting: 'CyclicOn', value: state.get('CyclicOn') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {displayTemp(timer.get('temp'), state.get('TempMode'))}
            </Text>
          ),
        },
        {
          title: 'Repeat',
          showDisclosureIndicator: true,
          onPress: () => settings.setPrompt({ title: 'Start Window', setting: 'CyclicOn', value: state.get('CyclicOn') }),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              Enabled
            </Text>
          ),
        },
      ],
    },
  ];

  const dayNames = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
    'Sun': 'Sunday',
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (const day of days) {
    data[1].rows.push(
      {
        title: dayNames[day],
        showDisclosureIndicator: true,
        onPress: () => settings.setPrompt({ title: 'Start Window', setting: 'CyclicOn', value: state.get('CyclicOn') }),
        renderAccessory: () => (
          <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
            Enabled
          </Text>
        ),
      },
    );
  }

  return (
    <View style={styles.container}>
      <SettingsScreen style={{ paddingTop: 20 }} data={data} />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => ({
  timer: state.timers.getIn(['timers', String(ownProps.route.params.id)]),
  state: state.state,
});

export default connect(mapStateToProps, {})(Timer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
