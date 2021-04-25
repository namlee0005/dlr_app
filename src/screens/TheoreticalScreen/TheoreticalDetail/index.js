import React, { useCallback, useState, createRef } from 'react';
import Box from '@src/components/Box';
import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import ImageIcon from '@src/components/ImageIcon';
import Underlined from '@src/components/Underlined';
import { FlatList, StyleSheet } from 'react-native';
import ItemExam from './ItemExam';

const TheoreticalDetail = ({ navigation, route }) => {
  const { exam } = route.params;
  const myFlatList = createRef();
  const [flatIndex, setFlatIndex] = useState(0);
  const [arrayHeight, setArrayHeight] = useState([]);

  const onNext = useCallback(() => {
    if (exam.questions.length - 1 === flatIndex) {
      return;
    }
    myFlatList.current.scrollToIndex({
      index: flatIndex + 1,
      animated: true,
    });
    setFlatIndex(flatIndex + 1);
  }, [flatIndex, myFlatList, exam.questions]);

  const onBack = useCallback(() => {
    if (flatIndex === 0) {
      return;
    }
    myFlatList.current.scrollToIndex({
      index: flatIndex - 1,
      animated: true,
    });
    setFlatIndex(flatIndex - 1);
  }, [flatIndex, myFlatList]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ItemExam
          item={item}
          navigation={navigation}
          flatIndex={flatIndex}
          index={index}
          exam={exam}
          arrayHeight={arrayHeight}
          setArrayHeight={setArrayHeight}
        />
      );
    },
    [navigation, flatIndex, exam, arrayHeight],
  );
  return (
    <Box padding={[0, 10]} background="white">
      <Box flexDirection="row" margin={[20, 0, 0, 0]} justify="space-between">
        <TouchableBox onPress={onBack}>
          <ImageIcon name="chevronLeft" circle={14} />
        </TouchableBox>
        <Typography>Câu {flatIndex + 1} / 25</Typography>
        <TouchableBox onPress={onNext}>
          <ImageIcon name="chevronRight" circle={14} />
        </TouchableBox>
      </Box>
      <Underlined />
      <FlatList
        horizontal
        ref={myFlatList}
        data={exam.questions}
        renderItem={renderItem}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={(item, index) =>
          (exam.questions.length + index).toString()
        }
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#efeff5',
  },
  flatList: { flexGrow: 1, margin: 10 },
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
export default TheoreticalDetail;
