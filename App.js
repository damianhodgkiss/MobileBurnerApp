import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { store, persistor } from './store';
import { mqttReconnect } from './mqtt';
import { sendState } from './actions/state';
import RemoteControl from './components/RemoteControl';
import Settings from './components/Settings';
import AboutSettings from './components/Settings/AboutSettings';
import SystemSettings from './components/Settings/SystemSettings';
import FuelSettings from './components/Settings/FuelSettings';
import ConnectionSettings from './components/Settings/ConnectionSettings';
import Timers from './components/Timers';
import BrokerHost from './components/Settings/ConnectionSettings/BrokerHost';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenComponent = ({ navigation, status }) => {
  const runState = status.get('RunState') || 0;
  let powerStateAllowed = 'NA'; // NA

  switch(runState) {
    case 0: // Stopped
      powerStateAllowed = 'ON';
      break;

    case 1: // Starting
    case 2: // Igniting
    case 3: // Ignition Retry
    case 4: // Ignited
    case 5: // Running
    case 9: // Heating Glow Plug
    case 11: // Suspending
    case 12: // Suspending Cooling
      powerStateAllowed = 'OFF';
      break;

    case 6: // Stopping
    case 7: // Shutting Down
    case 8: // Cooling
      powerStateAllowed = 'NA';
      break;

    case 10: // Suspended
      powerStateAllowed = 'ON';
      break;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'POWER') {
            return <MaterialCommunityIcons name="power" size={size} color={color} />
          }

          if (route.name === 'TIMERS') {
            return <MaterialIcons name="schedule" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        labelStyle: {
          color: 'white',
          fontSize: 14,
          marginTop: -10,
        },
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          left: 50,
          right: 50,
          bottom: 20,
          height: 100,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="POWER" component={RemoteControl} 
        options={{
          title: `POWER ${powerStateAllowed}`,
          labelStyle: {
            color: 'red',
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
          tabLongPress: e => {
            //e.preventDefault();
            const { dispatch } = store;
            console.log('POWER', powerStateAllowed, dispatch);
            if (powerStateAllowed === 'ON') {
              dispatch(sendState('RunState', 1));
            } else if (powerStateAllowed === 'OFF') {
              dispatch(sendState('RunState', 0));
            }
          },
        }}
        />
      <Tab.Screen name="TIMERS" component={Timers} listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate('Timers');
          },
        }}
        />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => ({
  status: state.state,
});

const HomeScreen = connect(mapStateToProps, {})(HomeScreenComponent);

export default function App() {
  React.useEffect(() => {
    const status = store.getState().state;
    
    mqttReconnect();
  }, []);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack.Navigator >
          <HomeStack.Screen name="Caravan Heater" component={HomeScreen} options={({ navigation, route }) => ({
            headerTransparent: true,
            headerTintColor: 'white',
            headerRight: () => (
              <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('Settings')}>
                <MaterialCommunityIcons name="settings" size={24} color="#fff" />
              </TouchableOpacity>
            )
          })} />
          <HomeStack.Screen name="Settings" component={Settings} options={{ headerBackTitle: 'Back' }} />
          <HomeStack.Screen name="Connection" component={ConnectionSettings} />
          <HomeStack.Screen name="About" component={AboutSettings} />
          <HomeStack.Screen name="System" component={SystemSettings} />
          <HomeStack.Screen name="Fuel Mixture" component={FuelSettings} />
          <HomeStack.Screen name="Host" component={BrokerHost} />

          <HomeStack.Screen name="Timers" component={Timers} options={{ headerBackTitle: 'Back' }} />
        </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  settings: {
    marginRight: 10,
  },
  heaters: {
    marginLeft: 10,
  },
});
