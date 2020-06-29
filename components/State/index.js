import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const State = ({ status }) => {
  const states = {
    connecting: 'Connecting to MQTT...',
    reconnecting: 'Reconnecting...',
    offline: 'Offline',
    unconfigured: 'Settings \u2192 Connection',
  };

  return (
    <LinearGradient
        colors={['rgb(233,108,31)', 'rgb(216,95,21)']}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textAlign: 'center', justifyContent: 'center' }}>{states[status]}</Text>
        </View>
    </LinearGradient>
  );
}

export default State;

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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
