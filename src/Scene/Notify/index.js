import React, {useState, useEffect} from 'react';
import {Platform, Alert} from 'react-native';
import dayjs from 'dayjs';
import NotifyContainer from './container';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import firebase from 'react-native-firebase';
import {addItem} from '../../helpers/database';

const Nofity = props => {
  const [date, setDate] = useState(Date.now());
  const [token, setToken] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [normalDate, setNormalDate] = useState(false);
  const [text, setText] = useState('Enter message here');

  let createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('notifyMe').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
    // firebase.notifications().onOpenNotification(notification => {
    //   console.log(notification);
    // });

    firebase.notifications().onNotificationOpened(notificationOpen => {
      console.log(notificationOpen);
      const {body, title} = notificationOpen.notification;
      Alert.alert(
        title,
        body,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    });
  };
  useEffect(() => {
    const channel = new firebase.notifications.Android.Channel(
      'notifyMe',
      'notify Me channel',
      firebase.notifications.Android.Importance.Max,
    );
    firebase.notifications().android.createChannel(channel);

    createNotificationListeners();
  });

  // DATE
  useEffect(() => {
    setNormalDate(dayjs(date).format('HH:mm--- DD.MM.YYYY'));
  }, [date]);

  // Timeanddate
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

  // Get token and push permissions
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };
  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    setToken(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        setToken(fcmToken);
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  };
  useEffect(() => {
    checkPermission();
  });

  // Receive messages

  return (
    <NotifyContainer
      {...props}
      onChange={onChange}
      showDatepicker={showDatepicker}
      showMode={showMode}
      showTimepicker={showTimepicker}
      date={date}
      mode={mode}
      setMode={setMode}
      show={show}
      setShow={setShow}
      normalDate={normalDate}
      setNormalDate={setNormalDate}
      addItem={addItem}
      token={token}
      text={text}
      setText={setText}
    />
  );
};

export default Nofity;
