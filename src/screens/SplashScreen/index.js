import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RealmSchemas } from '@src/realms/RealmsObject';
const Realm = require('realm');
import { useRequest } from '@umijs/hooks';
import { getAllA1 } from './services';
import { Alert, ActivityIndicator } from 'react-native';
import * as Store from '@src/store';
import { createA1Exam } from '@src/utils/handleA1Exam';
const SplashScreen = ({ navigation }) => {
  const { dispatch } = useContext(Store.StoreContext);

  const { run } = useRequest(getAllA1, {
    manual: true,
    onSuccess: (data) => {
      //onSucesss
      Realm.open({ schema: RealmSchemas }).then((realm) => {
        try {
          realm.write(() => {
            realm.delete(realm.objects('ExamA1'));
            data?.map((item) => {
              realm.create('ExamA1', item);
            });
          });
          let topicExam = [];

          for (let i = 0; i < 6; i++) {
            topicExam.push(createA1Exam(i + 1, realm));
          }
          realm.write(() => {
            realm.delete(realm.objects('TopicExam'));
            topicExam?.map((item) => {
              realm.create('TopicExam', item);
            });
          });
          dispatch({
            type: 'SET_REALM',
            payload: {
              realm,
            },
          });
        } catch (e) {
          // console.log(e);
          realm.close();
        }
      });
    },
    onError: (error) => {
      Alert.alert(
        'Thông báo',
        error?.msg ? error.msg : 'Có lỗi xảy ra vui lòng thử lại sau!',
      );
    },
  });

  useEffect(() => {
    async function getIsData() {
      let isFirstOpen = await AsyncStorage.getItem('FIRST_OPEN');
      if (isFirstOpen !== '1') {
        await run();
        // await AsyncStorage.setItem('FIRST_OPEN', '1');
      } else {
        Realm.open({ schema: RealmSchemas }).then((realm) => {
          dispatch({
            type: 'SET_REALM',
            payload: {
              realm,
            },
          });
        });
      }
      navigation.navigate('MainApp');
    }
    getIsData();
  }, [dispatch, navigation, run]);

  return <ActivityIndicator size="large" style={{ flex: 1 }} color="#ddd" />;
};

export default SplashScreen;
