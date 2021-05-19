import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { convertLongToTime } from '@src/utils/formatters/date';
import ImageIcon from '@src/components/ImageIcon';
import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import Box from '@src/components/Box';
import Underlined from '@src/components/Underlined';
import ItemExam from './ItemExam';
import realm from '@src/realms/realm';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const HeaderLeft = ({ time, idExam, title, status, total }) => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    const exam = realm
      .objects('TopicExam')
      .filtered('id =  ' + idExam)
      .map((i) => i)[0];
    if (exam !== 3) {
      realm.write(() => {
        exam.time = time;
      });
    }
    navigation.pop();
  }, [idExam, navigation, time]);

  return (
    <TouchableBox
      flexDirection="row"
      margin={[0, 10, 0, 0]}
      onPress={goBack}
      justify="center"
      align="center"
    >
      <ImageIcon name="backArrow" square={24} />
      <Typography padding={[0, 10, 0, 0]} fontSize={18} style={styles.title}>
        {title} ({status === 3 ? total + '/' + 25 : convertLongToTime(time)})
      </Typography>
    </TouchableBox>
  );
};

const HeaderRight = ({ idExam }) => {
  // const navigation = useNavigation();
  const exam = realm
    .objects('TopicExam')
    .filtered('id =  ' + idExam)
    .map((i) => i)[0];

  const submit = useCallback(() => {
    let incorrect = exam?.questions.filter(
      (i) => i.correctAnswer === i.selected,
    );
    realm.write(() => {
      exam.status = 3;
      exam.total = incorrect.length;
    });
  }, [exam]);

  return exam.status !== 3 ? (
    <TouchableBox onPress={submit} margin={[0, 0, 0, 10]}>
      <Typography fontSize={18} fontStyle="bold" color={'#E21B00'}>
        Kết thúc
      </Typography>
    </TouchableBox>
  ) : null;
};

const ExamScreen = ({ navigation, route }) => {
  const [exam] = useState(
    realm
      .objects('TopicExam')
      .filtered('id =  ' + route.params.idExam)
      .map((i) => i)[0],
  );
  const [countDown, setCountDown] = useState(exam?.time);
  const [itemExam, setItemExam] = useState(exam?.questions[0]);
  const [flatIndex, setFlatIndex] = useState(0);

  const headerLeft = useCallback(
    () => (
      <HeaderLeft
        time={countDown}
        idExam={route.params.idExam}
        title={exam?.title}
        status={exam?.status}
        total={exam?.total}
      />
    ),
    [countDown, exam, route.params.idExam],
  );
  const headerRight = useCallback(
    () => <HeaderRight idExam={route.params.idExam} />,
    [route.params.idExam],
  );

  const onNext = useCallback(() => {
    if (exam?.questions.length === flatIndex) {
      return;
    }
    setFlatIndex(flatIndex + 1);
    setItemExam(exam?.questions[flatIndex + 1]);
  }, [exam?.questions, flatIndex]);

  const onBack = useCallback(() => {
    if (flatIndex === 0) {
      return;
    }
    setFlatIndex(flatIndex - 1);
    setItemExam(exam?.questions[flatIndex - 1]);
  }, [exam?.questions, flatIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown !== 0) {
        let time = countDown - 1000;
        setCountDown(time);
      } else {
        //TODO add func ket thuc
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft,
      headerRight,
    });
  }, [countDown, navigation, exam?.title, headerLeft, headerRight]);

  return (
    <Box
      margin={[0, 16]}
      padding={[0, 10]}
      background="white"
      borderRadius={16}
    >
      <Box flexDirection="row" margin={[16, 16]} justify="space-between">
        <TouchableBox onPress={onBack}>
          <ImageIcon name="chevronLeftPurple" circle={14} />
        </TouchableBox>
        <Typography fontSize={16} style={styles.titleCard} color={'#302EA7'}>
          Câu {flatIndex + 1} / 25
        </Typography>
        <TouchableBox onPress={onNext}>
          <ImageIcon name="chevronRightPurple" circle={14} />
        </TouchableBox>
      </Box>
      <Underlined style={styles.underlined} />
      <ItemExam
        item={itemExam}
        flatIndex={flatIndex}
        idExam={route.params.idExam}
        status={exam?.status}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: '500' },
  titleCard: { fontWeight: '600' },
  underlined: { backgroundColor: '#302EA7' },
});

export default ExamScreen;
