import React, { useCallback, useState } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from 'react-native';
import TouchableBox from '@src/components/TouchableBox';
import { useNavigation } from '@react-navigation/native';
import ImageIcon from '@src/components/ImageIcon';
import realm from '@src/realms/realm';
import Underlined from '@src/components/Underlined';
import ItemExam from './ItemExam';
import { v4 as uuid } from 'uuid';
import AdView from '@src/components/AdView';
import { getBottomSpace } from 'react-native-iphone-x-helper';
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

const QuestionFails = () => {
  const [questionFails] = useState(
    realm.objects('QuestionsFail').map((i) => i),
  );

  const [flatIndex, setFlatIndex] = useState(0);
  const [visibleMenuAnswer, setVisibleMenuAnswer] = useState(false);
  const [itemExam, setItemExam] = useState(questionFails[0]);

  const onNext = useCallback(() => {
    if (questionFails.length - 1 === flatIndex) {
      return;
    }
    setFlatIndex(flatIndex + 1);
    setItemExam(questionFails[flatIndex + 1]);
  }, [questionFails, flatIndex]);

  const onBack = useCallback(() => {
    if (flatIndex === 0) {
      return;
    }
    setFlatIndex(flatIndex - 1);
    setItemExam(questionFails[flatIndex - 1]);
  }, [questionFails, flatIndex]);

  const onClickMenu = useCallback(() => {
    setVisibleMenuAnswer(!visibleMenuAnswer);
  }, [setVisibleMenuAnswer, visibleMenuAnswer]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const onPress = (nextIndex) => {
        setFlatIndex(nextIndex);
        setItemExam(questionFails[nextIndex]);
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
    [questionFails, flatIndex],
  );

  return (
    <Box flex={1}>
      <Box
        margin={[Platform.OS === 'ios' ? 50 : 30, 0, 0, 0]}
        flexDirection="row"
        justify="space-between"
      >
        <HeaderLeft title={'Các Câu Hay Sai'} />
        <HeaderRight
          setVisibleMenuAnswer={setVisibleMenuAnswer}
          visibleMenuAnswer={visibleMenuAnswer}
        />
      </Box>

      {questionFails.length > 0 && (
        <ScrollView
          flex={1}
          contentContainerStyle={styles.containerScrollView}
          showsVerticalScrollIndicator={false}
        >
          <Box
            margin={[16, 16]}
            padding={[0, 10]}
            background="white"
            borderRadius={16}
          >
            <Box flexDirection="row" margin={[16, 16]} justify="space-between">
              <TouchableBox onPress={onBack}>
                <ImageIcon name="chevronLeftPurple" circle={14} />
              </TouchableBox>
              <Typography
                fontSize={16}
                style={styles.titleCard}
                color={'#302EA7'}
              >
                Câu {flatIndex + 1} / {questionFails.length}
              </Typography>
              <TouchableBox onPress={onNext}>
                <ImageIcon name="chevronRightPurple" circle={14} />
              </TouchableBox>
            </Box>
            <Underlined style={styles.underlined} />
            <ItemExam item={itemExam} flatIndex={flatIndex} />
          </Box>
        </ScrollView>
      )}
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
                  data={questionFails}
                  renderItem={renderItem}
                  numColumns={2}
                  keyExtractor={() => uuid()}
                  extraData={questionFails}
                />
              </Box>
            </TouchableBox>
          </Box>
        </TouchableWithoutFeedback>
      )}
      <Box style={styles.ad}>
        <AdView type="image" media={false} />
      </Box>
    </Box>
  );
};

export default QuestionFails;

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
  ad: { position: 'absolute', bottom: 8, left: 0, right: 0 },
  containerScrollView: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() + 88 : 112,
  },
});
