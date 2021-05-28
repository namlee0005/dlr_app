import React, { useEffect, useState, useCallback } from 'react';
import { convertLongToTime } from '@src/utils/formatters/date';
import ImageIcon from '@src/components/ImageIcon';
import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import Box from '@src/components/Box';
import Underlined from '@src/components/Underlined';
import ItemExam from './ItemExam';
import realm from '@src/realms/realm';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { v4 as uuid } from 'uuid';

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
      margin={[0, 16, 0, 0]}
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

const HeaderRight = ({ idExam, visibleMenuAnswer, setVisibleMenuAnswer }) => {
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

  const onClickMenu = useCallback(() => {
    setVisibleMenuAnswer(!visibleMenuAnswer);
  }, [setVisibleMenuAnswer, visibleMenuAnswer]);

  return exam.status !== 3 ? (
    <Box flexDirection="row" margin={[0, 0, 0, 16]}>
      <TouchableBox onPress={submit} margin={[0, 0, 0, 8]}>
        <Typography fontSize={18} fontStyle="bold" color={'#E21B00'}>
          Kết thúc
        </Typography>
      </TouchableBox>
      <TouchableBox onPress={onClickMenu}>
        <ImageIcon name="menuAnswer" square={24} />
      </TouchableBox>
    </Box>
  ) : (
    <TouchableBox margin={[0, 0, 0, 16]} onPress={onClickMenu}>
      <ImageIcon name="menuAnswer" square={24} />
    </TouchableBox>
  );
};

const HEIGHT = Dimensions.get('window').height;

const ExamScreen = ({ route }) => {
  const [exam] = useState(
    realm
      .objects('TopicExam')
      .filtered('id =  ' + route.params.idExam)
      .map((i) => i)[0],
  );
  const [countDown, setCountDown] = useState(exam?.time);
  const [itemExam, setItemExam] = useState(exam?.questions[0]);
  const [flatIndex, setFlatIndex] = useState(0);
  const [visibleMenuAnswer, setVisibleMenuAnswer] = useState(false);

  const onNext = useCallback(() => {
    if (exam?.questions.length - 1 === flatIndex) {
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
        let incorrect = exam?.questions.filter(
          (i) => i.correctAnswer === i.selected,
        );
        realm.write(() => {
          exam.status = 3;
          exam.total = incorrect.length;
        });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown, exam]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const onPress = (nextIndex) => {
        setFlatIndex(nextIndex);
        setItemExam(exam?.questions[nextIndex]);
      };
      return (
        <Box flex={0.5} align="center" justify="center" margin={[0, 0, 8, 0]}>
          <TouchableBox
            style={[
              styles.numberAnswer,
              styles.answerSelected(index === flatIndex),
            ]}
            background={item?.isSentenceParalysis === 0 ? '#e3e3e3' : '#FFEC3E'}
            onPress={() => onPress(index)}
          >
            <Typography fontSize={12}>{index + 1}</Typography>
          </TouchableBox>
          {item?.selected !== -1 && (
            <TouchableBox
              style={styles.boxAnswer}
              onPress={() => onPress(index)}
              activeOpacity={1}
            >
              <Box style={styles.numberAnswer1(item, exam?.status)}>
                <Typography style={styles.textNumber(exam?.status)}>
                  {item?.selected}
                </Typography>
              </Box>
            </TouchableBox>
          )}
        </Box>
      );
    },
    [exam?.questions, exam?.status, flatIndex],
  );

  const onClickMenu = useCallback(() => {
    setVisibleMenuAnswer(!visibleMenuAnswer);
  }, [setVisibleMenuAnswer, visibleMenuAnswer]);

  return (
    <Box flex={1}>
      <Box margin={[50, 0, 0, 0]} flexDirection="row" justify="space-between">
        <HeaderLeft
          time={countDown}
          idExam={route.params.idExam}
          title={exam?.title}
          status={exam?.status}
          total={exam?.total}
        />
        <HeaderRight
          idExam={route.params.idExam}
          setVisibleMenuAnswer={setVisibleMenuAnswer}
          visibleMenuAnswer={visibleMenuAnswer}
        />
      </Box>
      <Box
        margin={[16, 16, 0, 16]}
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
      {visibleMenuAnswer && (
        <TouchableWithoutFeedback onPress={onClickMenu}>
          <Box flex={1} style={styles.boxMenu}>
            <TouchableBox disabled={false} activeOpacity={1}>
              <Box
                width={80}
                background="rgba(196, 196, 196, 0.8)"
                padding={[8, 4]}
                borderRadius={[12, 0]}
              >
                <FlatList
                  data={exam?.questions}
                  renderItem={renderItem}
                  numColumns={2}
                  keyExtractor={() => uuid()}
                  extraData={exam}
                />
              </Box>
            </TouchableBox>
          </Box>
        </TouchableWithoutFeedback>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: '500' },
  titleCard: { fontWeight: '600' },
  underlined: { backgroundColor: '#302EA7' },
  boxMenu: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: HEIGHT / 2,
  },
  boxAnswer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  numberAnswer: {
    borderRadius: 30 / 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4F4F4F',
  },
  numberAnswer1: (item, status) => {
    return {
      borderRadius: 14 / 2,
      width: 14,
      height: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        status === 3
          ? item?.selected === item?.correctAnswer
            ? '#302EA7'
            : '#E21B00'
          : '#e3e3e3',
      borderColor: status === 3 ? '#ffffff' : '#57db04',
      borderWidth: 1,
    };
  },
  answerSelected: (isSelected) => {
    if (isSelected) {
      return {
        borderWidth: 3,
        borderColor: '#57db04',
      };
    }
  },
  textNumber: (status) => {
    return {
      fontWeight: '300',
      fontSize: 9,
      color: status === 3 ? '#ffffff' : null,
    };
  },
});

export default ExamScreen;
