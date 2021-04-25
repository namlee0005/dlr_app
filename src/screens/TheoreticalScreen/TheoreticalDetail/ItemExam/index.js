import React, { useEffect, useState, useCallback, useContext } from 'react';

import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import { StyleSheet, Dimensions } from 'react-native';
import Box from '@src/components/Box';
import FastImage from 'react-native-fast-image';
import Underlined from '@src/components/Underlined';
import * as Store from '@src/store';

const DEVICE_WIDTH = Dimensions.get('window').width;

const ItemExam = ({
  item,
  index,
  flatIndex,
  exam,
  arrayHeight,
  setArrayHeight,
}) => {
  const [checkBoxs, setCheckBoxs] = useState([]);
  const { dispatch } = useContext(Store.StoreContext);
  useEffect(() => {
    //init checkbox
    let length = exam?.questions[flatIndex]?.answer.length;
    if (!length) {
      return;
    }
    let array = [];
    for (let i = 0; i < length; i++) {
      if (exam?.questions[flatIndex]?.selected !== undefined) {
        if (i === exam?.questions[flatIndex]?.selected) {
          array.push({ index: i, isSelected: true });
        } else {
          array.push({ index: i, isSelected: false });
        }
      } else {
        array.push({ index: i, isSelected: false });
      }
    }
    setCheckBoxs(array);
  }, [flatIndex, exam?.questions]);

  const _onLayout = (event) => {
    var { height } = event.nativeEvent.layout;
    let array = [...arrayHeight];
    array.push({ index, height });
    setArrayHeight(array);
  };

  const getHeight = () => {
    let itemHeight = arrayHeight.find((e) => e.index === flatIndex);
    return itemHeight?.height;
  };

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
      dispatch({
        type: 'UPDATE_RESULT',
        payload: {
          indexAnswer,
          flatIndex,
          exam,
        },
      });
    },
    [checkBoxs, dispatch, flatIndex, exam],
  );

  const renderAnswer = (answers) => {
    return answers.map((e) => {
      return (
        <Box key={e.stt.toString()}>
          <Underlined style={styles.answerUnderlined} />
          <TouchableBox
            style={styles.touAnswer}
            onPress={() => toggleAnswer(e.stt - 1)}
          >
            <Box
              style={[
                styles.answer,
                { backgroundColor: getBackground(e.stt - 1) },
              ]}
            >
              <Typography style={styles.textAnswer}>{e.stt}</Typography>
            </Box>
            <Typography>{e.content}</Typography>
          </TouchableBox>
        </Box>
      );
    });
  };

  return (
    <Box width={DEVICE_WIDTH} height={getHeight()}>
      <Box onLayout={_onLayout}>
        <Typography>{item.quest}</Typography>
        {item.image ? (
          <Box justify="center" align="center">
            <FastImage source={item.image} style={styles.image} />
          </Box>
        ) : null}
        {renderAnswer(item.answer)}
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
