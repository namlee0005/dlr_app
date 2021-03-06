import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import ImageIcon from '@src/components/ImageIcon';
import { convertLongToTime1 } from '@src/utils/formatters/date';
import realm from '@src/realms/realm';
import { v4 as uuid } from 'uuid';
import CircleExam from '@src/components/CircleExam';
import { createA1Exam } from '@src/utils/handleA1Exam';
import HeaderLeft from '@src/components/HeaderLeft';
import AdView from '@src/components/AdView';

const ItemTopic = ({ item, navigation }) => {
  const numberAnswered = useCallback(() => {
    const exam = realm
      .objects('TopicExam')
      .filtered('id =  ' + item?.id)
      .map((i) => i)[0];
    if (exam?.status === 3 || exam?.status === 4) {
      return exam?.total;
    }
    return exam?.questions.filter((i) => i.selected !== -1).length;
  }, [item?.id]);

  const onPress = useCallback(() => {
    const exam = realm
      .objects('TopicExam')
      .filtered('id =  ' + item?.id)
      .map((i) => i)[0];
    realm.write(() => {
      if (exam.status !== 3 && exam.status !== 4) {
        exam.status = 2;
      }
    });
    navigation.navigate('ExamScreen', {
      idExam: item?.id,
    });
  }, [item, navigation]);

  const getColor = useCallback(() => {
    if (item?.status === 1) {
      return 'rgb(48,46,167)';
    } else if (item?.status === 2) {
      return 'rgb(242,153,74)';
    }
    return item?.status !== 3 ? 'rgb(0,227,64)' : 'rgb(226,27,0)';
  }, [item]);
  // 1: làm bài, 2: đang làm, 3: xong
  const getContent = useCallback(
    (total, id) => {
      const exam = realm
        .objects('TopicExam')
        .filtered('id =  ' + id)
        .map((i) => i)[0];

      let questionFails = exam?.questions.filter(
        (i) => i.correctAnswer !== i.selected && i.selected !== -1,
      );

      let noAnswered = exam?.questions.filter((i) => i.selected === -1);

      if (item?.status === 1) {
        return '25 câu/19 phút';
      } else if (item?.status === 2) {
        return `Còn ${convertLongToTime1(item?.time)}`;
      }
      return (
        <Typography fontSize={13} padding={[8, 0, 0, 0]} color={'green'}>
          {'Đúng: ' + total}
          <Typography fontSize={13} padding={[8, 0, 0, 0]} color={'red'}>
            {' Sai: ' + questionFails.length}
          </Typography>
          <Typography
            fontSize={13}
            padding={[8, 0, 0, 0]}
            color={'rgb(242,153,74)'}
          >
            {' Chưa trả lời: ' + noAnswered.length}
          </Typography>
        </Typography>
      );
    },
    [item],
  );

  const getAction = useCallback(() => {
    if (item?.status === 1) {
      return 'Làm bài';
    } else if (item?.status === 2) {
      return 'Tiếp tục';
    }
    return item?.status !== 3 ? 'Đỗ' : 'Trượt';
  }, [item]);

  return (
    <TouchableBox onPress={onPress} flex={1} margin={[12, 0, 0, 0]}>
      <Box height={76} borderRadius={16}>
        <Box style={styles.child_card}>
          <Box flexDirection="row" align="center">
            <CircleExam
              color={getColor()}
              percent={50}
              width={44}
              answered={numberAnswered()}
              total={25}
            />
            <Box padding={[0, 16, 0, 0]}>
              <Typography fontSize={16}>{item.title}</Typography>
              <Typography fontSize={13} padding={[8, 0, 0, 0]}>
                {getContent(item?.total, item?.id)}
              </Typography>
            </Box>
          </Box>
          <Box flexDirection="row" align="center" justify="center">
            <Typography padding={[0, 0, 0, 8]} color={getColor()}>
              {getAction()}
            </Typography>
            <ImageIcon name={'chevronRightGray'} style={styles.image} />
          </Box>
        </Box>
      </Box>
    </TouchableBox>
  );
};

const TopicScreen = ({ navigation }) => {
  const [topicExam, setTopicExam] = useState(realm.objects('TopicExam'));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setTopicExam(realm.objects('TopicExam'));
    });
    return unsubscribe;
  }, [navigation]);

  const handleDecrease = () => {
    const temp = createA1Exam(topicExam.length + 1, realm);
    realm.write(() => {
      realm.create('TopicExam', temp);
    });
    setTopicExam(realm.objects('TopicExam'));
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <ItemTopic item={item} navigation={navigation} />;
    },
    [navigation],
  );
  return (
    <Box flex={1} margin={[0, 16]}>
      <Box
        margin={[Platform.OS === 'ios' ? 50 : 30, 0, 0, 0]}
        flexDirection="row"
        justify="space-between"
      >
        <HeaderLeft />
        <Box flexDirection="row">
          <TouchableBox
            margin={[0, 10]}
            onPress={() => navigation.navigate('ModalTitleNew')}
          >
            <ImageIcon name="warningCircle" square={24} />
          </TouchableBox>
          <TouchableBox margin={[0, 10]} onPress={handleDecrease}>
            <ImageIcon name="random" square={24} />
          </TouchableBox>
        </Box>
      </Box>
      <FlatList
        data={topicExam}
        renderItem={renderItem}
        keyExtractor={() => uuid()}
        extraData={topicExam}
        showsVerticalScrollIndicator={false}
      />
      <AdView type="image" media={false} />
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

  child_card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: { height: 18, width: 18 },
  circle: { borderColor: 'gray', borderWidth: 2 },
});

export default TopicScreen;
