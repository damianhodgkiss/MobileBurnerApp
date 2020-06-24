import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { store } from '../../store';
import { sendState, updateState } from '../../actions/state';

const Row = ({ label, value, children }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
      <Text style={{ flexGrow: 1, fontSize: 14, color: 'rgb(241,160,62)' }}>{label.toUpperCase()}</Text>
      <Text style={{ color: 'white', fontSize: 14, marginRight: 4 }}>{value.toUpperCase()}</Text>
      {children}
    </View>
  )
}

let timeout = null;

const RemoteControl = ({ status }) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const RPM = status.get('FanRPM');
  const runState = Number(status.get('RunState') || 0);
  
  const spinFan = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000 / (RPM / 2000),
      easing: Easing.linear,
    }).start(() => spinFan());
  };

  React.useEffect(() => {
    if (RPM > 0) spinFan();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const setTemperature = (dir) => {
    const { dispatch } = store;
    const desiredTemp = Math.min(Math.max(
      status.get('TempDesired') + dir, status.get('TempMin')
    ), status.get('TempMax'));

    dispatch(updateState('TempDesired', desiredTemp));   

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(sendState('TempDesired', desiredTemp));
    }, 1000);
  };

  return (
    <LinearGradient
        colors={['rgb(233,108,31)', 'rgb(216,95,21)']}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{status.get('RunString')}</Text>
          <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
            <AnimatedCircularProgress
              style={{ alignItems: 'center' }}
              size={300}
              width={20}
              backgroundWidth={12}
              fill={10}
              rotation={210}
              arcSweepAngle={300}
              tintColor="white"
              backgroundColor="rgb(241,160,62)"
              dashedBackground={{ width: 1, gap: 3 }}
              dashedTint={{ width: 2, gap: 5 }}
              childrenContainerStyle={{ alignItems: 'center' }}
            >
              {
                (fill) => (
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.temperature}>{status.get('TempDesired')}</Text>
                    <Text style={{ fontSize: 14, color: 'rgb(241,160,62)', textAlign: 'center' }}>AMBIENT {status.get('TempCurrent')}{'\u2103'}</Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
            <View style={{ top: -50, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setTemperature(-1)} style={{ marginRight: 10 }}><FontAwesome5 name="caret-down" size={50} color="rgb(241,160,62)" /></TouchableOpacity>
              <TouchableOpacity onPress={() => setTemperature(1)} style={{ marginLeft: 10 }}><FontAwesome5 name="caret-up" size={50} color="rgb(241,160,62)" /></TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingLeft: 40, paddingRight: 40, ...Platform.select({
            ios: {
              top: -50,
            },
          }) }}>
            {(runState !== 0 || RPM > 0) &&
              <Row label="Fan Speed" value={`${RPM} RPM`}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <MaterialCommunityIcons name="fan" size={16} color="white" />
                </Animated.View>
              </Row>
            }
            {(runState !== 0 || status.get('PumpActual') > 0) &&
              <Row label="Fuel Pump" value={`${status.get('PumpActual')} Hz`}>
                <FontAwesome5 name="gas-pump" size={16} color="white" />
              </Row>
            }
            <Row label="Body Temperature" value={`${status.get('TempBody')}\u2103`}>
              <MaterialCommunityIcons name="thermometer" size={16} color="white" />
            </Row>
            <Row label="Input Voltage" value={`${status.get('InputVoltage')}V`}>
              <MaterialCommunityIcons name="battery" size={16} color="white" />
            </Row>
            {![0,4,5,8,10,12].includes(runState) &&
              <Row label="Glow Plug" value={`${status.get('GlowCurrent')}A`}>
                <MaterialCommunityIcons name="power-plug" size={16} color="white" />
              </Row>
            }
          </View>

        </View>
    </LinearGradient>
  );
}

const mapStateToProps = (state) => ({
  status: state.state,
});

export default connect(mapStateToProps, {})(RemoteControl);

const styles = StyleSheet.create({
  fan: {
    alignItems: 'center',
  },
  fanText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 12,
  },
  container: {
    padding: 20,
    marginTop: 30,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    paddingTop: 40,
  },
  temperature: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
