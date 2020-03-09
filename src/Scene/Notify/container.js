import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NotifyContainer = props => {
  return (
    <View style={styles.main}>
      <View style={styles.mar}>
        <Button onPress={props.showDatepicker} title="Show date picker!" />
      </View>
      <View style={styles.mar}>
        <Button onPress={props.showTimepicker} title="Show time picker!" />
      </View>
      <View style={styles.mar}>
        <Text>{props.normalDate}</Text>
      </View>
      {props.show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={120}
          value={props.date}
          mode={props.mode}
          is24Hour={true}
          display="spinner"
          onChange={props.onChange}
          minimumDate={Date.now()}
        />
      )}
      <KeyboardAvoidingView behavior="padding" enabled>
        <TextInput
          style={[styles.input, styles.mar]}
          value={props.text}
          onChangeText={val => props.setText(val)}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => props.addItem(props.token, props.date, props.text)}
        disabled={
          props.token === undefined ||
          props.date === undefined ||
          !props.text.length
        }>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mar: {
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: 200,
    borderRadius: 5,
    textAlign: 'center',
  },
  save: {
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NotifyContainer;
