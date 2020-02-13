import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import dayjs from 'dayjs';
import NotifyContainer from './container';
import firebase from 'react-native-firebase';

const Nofity = props => {
  const [date, setDate] = useState(Date.now());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [normalDate, setNormalDate] = useState(false);
  let notificationTime,
    enableNotification = true;
  useEffect(() => {
    setNormalDate(dayjs(date).format('HH:mm--- DD.MM.YYYY'));
  }, [date]);
  useEffect(() => {
    setReminder();
  }, [date]);

  const setReminder = async () => {
    if (enableNotification) {
      firebase.notifications().scheduleNotification(buildNotification(), {
        fireDate: date.getTime(),
        repeatInterval: 'day',
        exact: true,
      });
    } else {
      return false;
    }
  };
  const buildNotification = () => {
    const title = Platform.OS === 'android' ? 'IT`S TIME!' : '';
    const notification = new firebase.notifications.Notification()
      .setNotificationId('1') // Any random ID
      .setTitle(title) // Title of the notification
      .setBody('This is a notification') // body of notification
      .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
      .android.setChannelId('reminder') // should be the same when creating channel for Android
      .android.setAutoCancel(true); // To remove notification when tapped on it

    return notification;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios');
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <NotifyContainer
      {...props}
      onChange={onChange}
      showDatepicker={showDatepicker}
      showMode={showMode}
      showTimepicker={showTimepicker}
      date={date}
      setDate={setDate}
      mode={mode}
      setMode={setMode}
      show={show}
      setShow={setShow}
      normalDate={normalDate}
      setNormalDate={setNormalDate}
    />
  );
};

export default Nofity;
