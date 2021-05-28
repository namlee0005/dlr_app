import React, { useCallback, useState } from 'react';
import Box from '@src/components/Box';
import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import ImageIcon from '@src/components/ImageIcon';
import Underlined from '@src/components/Underlined';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import ItemExam from './ItemExam';
import realm from '@src/realms/realm';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuid } from 'uuid';

const HEIGHT = Dimensions.get('window').height;

const HeaderLeft = ({ title }) => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <Box margin={[0, 16, 0, 0]} flexDirection="row">
      <TouchableBox onPress={goBack} justify="center" align="center">
        <ImageIcon name="backArrow" square={24} />
      </TouchableBox>
      <Typography padding={[0, 10, 0, 0]} fontSize={18} style={styles.title}>
        {title}
      </Typography>
    </Box>
  );
};

const HeaderRight = ({ visibleMenuAnswer, setVisibleMenuAnswer }) => {
  const onClickMenu = useCallback(() => {
    setVisibleMenuAnswer(!visibleMenuAnswer);
  }, [setVisibleMenuAnswer, visibleMenuAnswer]);

  return (
    <TouchableBox margin={[0, 0, 0, 16]} onPress={onClickMenu}>
      <ImageIcon name="menuAnswer" square={24} />
    </TouchableBox>
  );
};

const TheoreticalDetail = ({ navigation, route }) => {
  const [examTheoretical] = useState(
    realm
      .objects('Theoretical')
      .map((i) => i)
      .filter((i) => i.type === route.params.id),
  );

  const [itemExam, setItemExam] = useState(examTheoretical[0]);
  const [flatIndex, setFlatIndex] = useState(0);
  const [visibleMenuAnswer, setVisibleMenuAnswer] = useState(false);

  const onNext = useCallback(() => {
    if (examTheoretical.length - 1 === flatIndex) {
      return;
    }
    setFlatIndex(flatIndex + 1);
    setItemExam(examTheoretical[flatIndex + 1]);
  }, [examTheoretical, flatIndex]);

  const onBack = useCallback(() => {
    if (flatIndex === 0) {
      return;
    }
    setFlatIndex(flatIndex - 1);
    setItemExam(examTheoretical[flatIndex - 1]);
  }, [examTheoretical, flatIndex]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const onPress = (nextIndex) => {
        setFlatIndex(nextIndex);
        setItemExam(examTheoretical[nextIndex]);
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
              <Box style={styles.numberAnswer1(item)}>
                <Typography style={styles.textNumber()}>
                  {item?.selected}
                </Typography>
              </Box>
            </TouchableBox>
          )}
        </Box>
      );
    },
    [examTheoretical, flatIndex],
  );

  const onClickMenu = useCallback(() => {
    setVisibleMenuAnswer(!visibleMenuAnswer);
  }, [setVisibleMenuAnswer, visibleMenuAnswer]);

  return (
    <Box flex={1}>
      <Box margin={[50, 0, 16, 0]} flexDirection="row" justify="space-between">
        <HeaderLeft title={route?.params?.title} />
        <HeaderRight
          setVisibleMenuAnswer={setVisibleMenuAnswer}
          visibleMenuAnswer={visibleMenuAnswer}
        />
      </Box>
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
            Câu {flatIndex + 1} / {examTheoretical.length}
          </Typography>
          <TouchableBox onPress={onNext}>
            <ImageIcon name="chevronRightPurple" circle={14} />
          </TouchableBox>
        </Box>
        <Underlined style={styles.underlined} />
        <ItemExam item={itemExam} flatIndex={flatIndex} />
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
                  data={examTheoretical}
                  renderItem={renderItem}
                  numColumns={2}
                  keyExtractor={() => uuid()}
                  extraData={examTheoretical}
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
        item?.selected === item?.correctAnswer ? '#302EA7' : '#E21B00',
      borderColor: '#ffffff',
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
      color: '#ffffff',
    };
  },
});

export default TheoreticalDetail;
