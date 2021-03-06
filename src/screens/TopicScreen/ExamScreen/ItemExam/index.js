import React, { useEffect, useState, useCallback } from 'react';

import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import { StyleSheet, Dimensions } from 'react-native';
import Box from '@src/components/Box';
import { v4 as uuid } from 'uuid';
import realm from '@src/realms/realm';
import Underlined from '@src/components/Underlined';
import ImageIcon from '@src/components/ImageIcon';
import FastImage from 'react-native-fast-image';
import resources from '@src/components/ImageIcon/resources';
const DEVICE = Dimensions.get('window');

const ItemExam = ({ item, flatIndex, idExam, status }) => {
  const [checkBox, setCheckBox] = useState([]);
  useEffect(() => {
    //init checkbox
    let array = [];
    for (let i = 0; i < 4; i++) {
      if (item?.selected !== undefined) {
        if (i === item?.selected - 1) {
          array.push({ index: i, isSelected: true });
        } else {
          array.push({ index: i, isSelected: false });
        }
      } else {
        array.push({ index: i, isSelected: false });
      }
    }
    setCheckBox(array);
  }, [flatIndex, item]);

  const toggleAnswer = useCallback(
    (indexAnswer) => {
      let array = [...checkBox];
      array.map((e) => {
        if (e.index === indexAnswer) {
          e.isSelected = true;
        } else {
          e.isSelected = false;
        }
      });
      setCheckBox(array);
      const exam = realm
        .objects('TopicExam')
        .filtered('id =  ' + idExam)
        .map((i) => i)[0];
      realm.write(() => {
        exam.questions[flatIndex].selected = indexAnswer + 1;
      });
    },
    [checkBox, flatIndex, idExam],
  );

  const getColorAnswer = useCallback(
    (number) => {
      if (status === 3 || status === 4) {
        if (item?.selected === -1 && number + 1 === item?.correctAnswer) {
          return '#302EA7';
        }
        if (number + 1 === item?.selected) {
          if (item?.selected === item?.correctAnswer) {
            return '#302EA7';
          } else {
            return '#E21B00';
          }
        }
        if (number + 1 === item?.correctAnswer) {
          return '#302EA7';
        }
        return '#4F4F4F';
      }
      if (checkBox.find((e) => e.index === number)?.isSelected) {
        return '#302EA7';
      }
      return '#000000';
    },
    [checkBox, item?.correctAnswer, item?.selected, status],
  );

  const getColorNumberAnswer = useCallback(
    (number) => {
      if (status === 3 || status === 4) {
        if (number + 1 === item?.selected) {
          if (item?.selected === item?.correctAnswer) {
            return styles.numberAnswerSelected;
          } else {
            return styles.numberAnswerFail;
          }
        }
        if (number + 1 === item?.correctAnswer) {
          return styles.numberAnswerSelected;
        }
        return null;
      }
      if (checkBox.find((e) => e.index === number)?.isSelected) {
        return styles.numberAnswerSelected;
      }
      return null;
    },
    [checkBox, item?.correctAnswer, item?.selected, status],
  );

  const getBgNumber = useCallback(
    (number) => {
      if (status === 3 || status === 4) {
        if (number + 1 === item?.selected) {
          return styles.textNumberAnswer;
        }
        if (number + 1 === item?.correctAnswer) {
          return styles.textNumberAnswer;
        }
        return styles.textNumberAnswer1;
      }

      if (number + 1 === item?.selected) {
        return styles.textNumberAnswer;
      }

      return styles.textNumberAnswer1;
    },
    [item?.correctAnswer, item?.selected, status],
  );

  const getAnswers = useCallback(
    (number, answers) => {
      if (status === 3 || status === 4) {
        if (number + 1 === item?.selected) {
          if (item?.selected === item?.correctAnswer) {
            return (
              <Typography>
                {answers.trim()}{' '}
                <FastImage
                  source={resources.check}
                  style={styles.heightIcon}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </Typography>
            );
          } else {
            return (
              <Typography>
                {answers.trim()}{' '}
                <FastImage
                  source={resources.close}
                  style={styles.heightIcon}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </Typography>
            );
          }
        }
        if (number + 1 === item?.correctAnswer) {
          return (
            <Typography>
              {answers.trim()}{' '}
              <FastImage
                source={resources.check}
                style={styles.heightIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Typography>
          );
        }
        return answers.trim();
      }
      return answers.trim();
    },
    [item?.correctAnswer, item?.selected, status],
  );

  const renderAnswer = (answers, number) => {
    if (answers == null) {
      return null;
    } else {
      return (
        <Box key={uuid()}>
          <TouchableBox
            style={styles.touAnswer}
            onPress={() => toggleAnswer(number)}
            disabled={status === 3 || status === 4}
          >
            <Box style={[styles.numberAnswer, getColorNumberAnswer(number)]}>
              <Typography style={getBgNumber(number)}>{number + 1}</Typography>
            </Box>
            <Box style={styles.answer}>
              <Typography color={getColorAnswer(number)}>
                {getAnswers(number, answers)}
              </Typography>
            </Box>
          </TouchableBox>
        </Box>
      );
    }
  };

  return (
    <Box margin={[16, 0, 0, 0]}>
      <Typography>
        {item?.question.trim()}{' '}
        {item?.isSentenceParalysis === 1 && (
          <Typography color="#e6d00e">(C??u ??i???m li???t)</Typography>
        )}
      </Typography>
      {item?.urlImage ? (
        <ImageIcon
          name={item?.urlImage}
          style={styles.image}
          resizeMode="contain"
        />
      ) : null}
      {renderAnswer(item?.answer1, 0)}
      {renderAnswer(item?.answer2, 1)}
      {renderAnswer(item?.answer3, 2)}
      <Box margin={[0, 0, 10, 0]}>{renderAnswer(item?.answer4, 3)}</Box>
      {status === 3 || status === 4 ? (
        <Box>
          <Underlined style={styles.underlined} />
          <Box style={styles.answer}>
            <Typography fontSize={16} padding={[8, 0, 0, 0]}>
              Gi???i th??ch ????p ??n
            </Typography>
            <Box
              background="rgba(48, 46, 167, 0.3)"
              borderRadius={4}
              padding={[0, 8]}
              margin={[8, 0, 8, 0]}
            >
              <Typography padding={[8, 0, 8, 0]}>{item?.explain}</Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ItemExam;

const styles = StyleSheet.create({
  answerUnderlined: { opacity: 0.2, height: 0.5, marginTop: 10 },
  touAnswer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  numberAnswer: {
    borderRadius: 24 / 2,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    marginRight: 10,
  },
  numberAnswerSelected: { backgroundColor: '#302EA7', borderWidth: 0 },
  numberAnswerFail: { backgroundColor: '#E21B00', borderWidth: 0 },
  textNumberAnswer: { fontSize: 16, color: '#FFFFFF' },
  textNumberAnswer1: { fontSize: 16, color: '#4F4F4F' },
  image: { width: DEVICE.width - 32 - 32, height: 200 },
  answer: { flexShrink: 1 },
  underlined: { backgroundColor: '#302EA7' },
  heightIcon: { height: 16, width: 24 },
});
