import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';

const convertSecToHour = (seconds) => {
  const secs = Number(seconds);
  const days = Math.floor(secs / (24 * 3600));
  const hours = Math.floor(secs % (3600 * 24) / 3600);
  const mins = Math.floor(secs % 3600 / 60);
  const disp = [];

  if (days > 0) {
    disp.push(`${days} day${days === 1 ? '' : 's'}`);
  }

  if (hours > 0) {
    disp.push(`${hours} hr${hours === 1 ? '' : 's'}`);
  }

  if (mins > 0) {
    disp.push(`${mins} min${mins === 1 ? '' : 's'}`);
  }

  return disp.join(', ');
}

const AboutSettings = ({ status }) => {
  let noGPIO = false;
  noGPIO |= (status.get('GPin1') === undefined);
  noGPIO |= (status.get('GPin2') === undefined);
  noGPIO |= (status.get('GPmodeIn1') === undefined);
  noGPIO |= (status.get('GPmodeIn2') === undefined);
  noGPIO |= (status.get('GPout1') === undefined);
  noGPIO |= (status.get('GPout2') === undefined);
  noGPIO |= (status.get('GPmodeOut1') === undefined);
  noGPIO |= (status.get('GPmodeOut2') === undefined);

  let noAnalog = false;
  noAnalog |= (status.get('GPmodeAnlg') === undefined);
  noAnalog |= (status.get('GPanlg') === undefined);

  let gpioCapability = 'Not fitted';
  if (!noGPIO) {
    if (noAnalog) {
      gpioCapability = 'Digital I/O only';
    } else {
      gpioCapability = 'Digital I/O & Analogue in';
    }
  }
  const data = [
    {
      type: 'SECTION',
      header: 'Versions'.toUpperCase(),
      rows: [
        {
          title: 'Afterburner',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('SysVer')}
            </Text>
          ),
        },
        {
          title: 'Date',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('SysDate')}
            </Text>
          ),
        },
        {
          title: 'GPIO',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {gpioCapability}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Run Times'.toUpperCase(),
      rows: [
        {
          title: 'System',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {convertSecToHour(status.get('SysUpTime'))}
            </Text>
          ),
        },
        {
          title: 'Heater',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {convertSecToHour(status.get('SysRunTime'))}
            </Text>
          ),
        },
        {
          title: 'Glow Plug',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {convertSecToHour(status.get('SysGlowTime'))}
            </Text>
          ),
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Network'.toUpperCase(),
      rows: [
        {
          title: 'Bluetooth MAC',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('BT_MAC')}
            </Text>
          ),
        },
        {
          title: 'Access Point IP',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('IP_AP')}
            </Text>
          ),
        },
        {
          title: 'Access Point MAC',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('IP_APMAC')}
            </Text>
          ),
        },
        {
          title: 'Station IP',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('IP_STA')}
            </Text>
          ),
        },
        {
          title: 'Station MAC',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('IP_STAMAC')}
            </Text>
          ),
        },
        {
          title: 'Station SSID',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('IP_STASSID')}
            </Text>
          ),
        },
        {
          title: 'OTA Updates',
          showDisclosureIndicator: false,
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {status.get('IP_OTA') ? 'Enabled' : 'Disabled'}
            </Text>
          ),
        },
      ],
    },
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

export default connect(mapStateToProps, {})(AboutSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
