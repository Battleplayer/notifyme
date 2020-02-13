import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
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
});

export default NotifyContainer;
