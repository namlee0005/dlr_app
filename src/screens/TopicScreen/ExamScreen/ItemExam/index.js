import React, { useEffect, useState, useCallback } from 'react';

import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import { StyleSheet, Dimensions } from 'react-native';
import Box from '@src/components/Box';
import FastImage from 'react-native-fast-image';
import Underlined from '@src/components/Underlined';
import { v4 as uuid } from 'uuid';
import realm from '@src/realms/realm';

const DEVICE_WIDTH = Dimensions.get('window').width;

const ItemExam = ({ item, flatIndex, idExam }) => {
  const [checkBoxs, setCheckBoxs] = useState([]);
  // console.log(item, 'item');
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
    setCheckBoxs(array);
  }, [flatIndex, item]);

  const getBackground = useCallback(
    (indexAnswer) => {
      let itemCheckBoxs = checkBoxs.find((e) => e.index === indexAnswer);
      if (itemCheckBoxs?.isSelected) {
        return '#3cff00';
      }
      return undefined;
    },
    [checkBoxs],
  );

  const toggleAnswer = useCallback(
    (indexAnswer) => {
      let array = [...checkBoxs];
      array.map((e) => {
        if (e.index === indexAnswer) {
          e.isSelected = true;
        } else {
          e.isSelected = false;
        }
      });
      setCheckBoxs(array);
      const exam = realm
        .objects('TopicExam')
        .filtered('id =  ' + idExam)
        .map((i) => i)[0];
      realm.write(() => {
        exam.questions[flatIndex].selected = indexAnswer + 1;
      });
    },
    [checkBoxs, flatIndex, idExam],
  );

  const renderAnswer = (answers, number) => {
    if (answers == null) {
      return null;
    } else {
      return (
        <Box key={uuid()}>
          <Underlined style={styles.answerUnderlined} />
          <TouchableBox
            style={styles.touAnswer}
            onPress={() => toggleAnswer(number)}
          >
            <Box
              style={[
                styles.answer,
                { backgroundColor: getBackground(number) },
              ]}
            >
              <Typography style={styles.textAnswer}>{number + 1}</Typography>
            </Box>
            <Typography>{answers}</Typography>
          </TouchableBox>
        </Box>
      );
    }
  };

  return (
    <Box width={DEVICE_WIDTH}>
      <Box>
        <Typography>{item?.question}</Typography>
        {item?.image ? (
          <Box justify="center" align="center">
            <FastImage source={item?.image} style={styles.image} />
          </Box>
        ) : null}
        {renderAnswer(item?.answer1, 0)}
        {renderAnswer(item?.answer2, 1)}
        {renderAnswer(item?.answer3, 2)}
        <Box margin={[0, 0, 10, 0]}>{renderAnswer(item?.answer4, 3)}</Box>
      </Box>
    </Box>
  );
};

export default ItemExam;

const styles = StyleSheet.create({
  answerUnderlined: { opacity: 0.2, height: 0.5, marginTop: 10 },
  touAnswer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  answer: {
    borderRadius: 30 / 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    marginRight: 10,
  },
  textAnswer: { fontSize: 16, color: '#3f403e' },
  image: { height: 100, width: 100, marginTop: 10 },
});
