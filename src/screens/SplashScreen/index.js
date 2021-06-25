import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createA1Exam, createTheoretical } from '@src/utils/handleA1Exam';
import realm from '@src/realms/realm';
import { examData } from '@src/utils/constant';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    async function getIsData() {
      let isFirstOpen = await AsyncStorage.getItem('FIRST_OPEN');
      if (isFirstOpen !== '1') {
        realm.write(() => {
          realm.delete(realm.objects('ExamA1'));
          examData?.map((item) => {
            realm.create('ExamA1', item);
          });
        });
        let topicExam = [];
        for (let i = 0; i < 6; i++) {
          topicExam.push(createA1Exam(i + 1, realm));
        }
        let theoretical = createTheoretical(realm);

        realm.write(() => {
          realm.delete(realm.objects('TopicExam'));
          topicExam?.map((item) => {
            realm.create('TopicExam', item);
          });
          realm.delete(realm.objects('Theoretical'));
          theoretical?.map((item) => {
            realm.create('Theoretical', item);
          });
        });
        await AsyncStorage.setItem('FIRST_OPEN', '1');
      }
      navigation.navigate('MainApp');
    }
    getIsData();
  }, [navigation]);

  return (
    <ActivityIndicator size="large" style={styles.container} color="#ddd" />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default SplashScreen;
