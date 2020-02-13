import React, {useEffect} from 'react';
import Nofity from './src/Scene/Notify';
import {Alert} from 'react-native';
import firebase from 'react-native-firebase';

const App = () => {
  useEffect(() => {
    createNotificationChannel();
    checkPermission();
  });
  const createNotificationChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      'reminder',
      'Reminders Channel',
      firebase.notifications.Android.Importance.High,
    ).setDescription('Used for getting reminder notification');

    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  };

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      let notificationListener = firebase
        .notifications()
        .onNotification(async notification => {
          // Display your notification
          await firebase.notifications().displayNotification(notification);
        });
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        Alert.alert(
          'Unable to access the Notification permission. Please enable the Notification Permission from the settings',
        );
      }
    }
  };

  return <Nofity />;
};

export default App;
