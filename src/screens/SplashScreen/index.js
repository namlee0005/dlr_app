import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRequest } from '@umijs/hooks';
import { getAllA1 } from './services';
import { Alert, ActivityIndicator } from 'react-native';
import { createA1Exam } from '@src/utils/handleA1Exam';
import realm from '@src/realms/realm';
const SplashScreen = ({ navigation }) => {
  const { run } = useRequest(getAllA1, {
    manual: true,
    onSuccess: (data) => {
      //on Success
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
      } catch (e) {
        realm.close();
      }
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
        await AsyncStorage.setItem('FIRST_OPEN', '1');
      }
      navigation.navigate('MainApp');
    }
    getIsData();
  }, [navigation, run]);

  return <ActivityIndicator size="large" style={{ flex: 1 }} color="#ddd" />;
};

export default SplashScreen;
