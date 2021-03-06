import * as React from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import { SettingsScreen } from 'react-native-settings-screen';
import Prompt from 'react-native-input-prompt-cex';
import { useState } from 'react';
import { store } from '../../store';
import { sendState, updateState } from '../../actions/state';

const SettingsPrompt = ({ visible, title, placeholder, setting, value, onClose }) => {
  const submitPrompt = (key, value) => {
    const { dispatch } = store;

    if (key.indexOf('MQTTClient') === 0) {
      dispatch(updateState(key, value));
    } else {
      dispatch(updateState(key, value));
      dispatch(sendState(key, value));
    }
    onClose();
  };
    
  return (
    <Prompt
      isTransparent={false}
      textInputProps={{ autoCapitalize: 'none', defaultValue: value ? String(value) : null }}
      visible={visible}
      title={title}
      placeholder={placeholder}
      onCancel={onClose}
      onSubmit={(text) => submitPrompt(setting, text)}
    />
  );
};

const SettingsPicker = ({ value, setting, options, onClose }) => {
  const submitValue = (value) => {
    const { dispatch } = store;

    if (setting.indexOf('MQTTClient') === 0) {
      dispatch(updateState(setting, value));
    } else {
      dispatch(updateState(setting, value));
      dispatch(sendState(setting, value));
    }
    onClose();
  };

  return (
    <Picker
      selectedValue={Number(value)}
      onValueChange={submitValue}
    >
      {Object.keys(options).map(key => <Picker.Item label={options[key]} value={Number(key)} />)}
    </Picker>

  )
};

const MySettingsScreen = ({ set, data }) => {
  const [prompt, setPrompt] = useState(null);
  const [picker, setPicker] = useState(null);

  set({
    setPrompt,
    setPicker,
  });

  return (
    <View style={styles.container}>
      <SettingsScreen style={{ paddingTop: 20 }} data={data} />
      {prompt &&
        <SettingsPrompt
          visible
          setting={prompt.setting}
          title={prompt.title}
          value={prompt.value}
          placeholder={prompt.placeholder}
          onClose={() => setPrompt(null)}
        />
      }
      {picker &&
        <SettingsPicker options={picker.options}
        value={picker.value}
        setting={picker.setting}
        onClose={() => setPicker(null)}
        />
      }
    </View>
  );
}

export default MySettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
