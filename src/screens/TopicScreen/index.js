import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Box from '@src/components/Box';
import TouchableBox from '@src/components/TouchableBox';
import Typography from '@src/components/Typography';
import ImageIcon from '@src/components/ImageIcon';
import { convertLongToTime1 } from '@src/utils/formatters/date';
import realm from '@src/realms/realm';
import { v4 as uuid } from 'uuid';

import { createA1Exam } from '@src/utils/handleA1Exam';

const ItemTopic = ({ item, navigation }) => {
  const onPress = useCallback(() => {
    navigation.navigate('ExamScreen', {
      idExam: item?.id,
    });
  }, [item, navigation]);

  const getColor = useCallback(() => {
    if (item?.status === 0) {
      return 'green';
    } else if (item?.status === 1) {
      return '#dbdb32';
    }
    return 'red';
  }, [item]);
  // 0: làm bài, 1: đang làm, 2: xong
  const getContent = useCallback(() => {
    if (item?.status === 0) {
      return '25 câu/20 phút';
    } else if (item?.status === 1) {
      return `Còn ${convertLongToTime1(item?.time)}`;
    }
    return 'yellow';
  }, [item]);

  const getAction = useCallback(() => {
    if (item?.status === 0) {
      return 'LÀM BÀI';
    } else if (item?.status === 1) {
      return 'TIẾP TỤC';
    }
    return item?.total > 21 ? 'ĐỖ' : 'TRƯỢT';
  }, [item]);

  return (
    <TouchableBox onPress={onPress} flex={1} margin={[10, 0, 0, 0]}>
      <Box flex={1} height={60} background={getColor()} borderRadius={21}>
        <Box style={styles.child_card}>
          <Box flexDirection="row" align="center">
            <Box
              circle={40}
              align="center"
              justify="center"
              style={styles.circle}
            >
              <Typography fontSize={18}>{item.id}</Typography>
            </Box>
            <Box padding={[0, 10, 0, 0]}>
              <Typography>{item.title}</Typography>
              <Typography>{getContent()}</Typography>
            </Box>
          </Box>
          <Box flexDirection="row" align="center">
            <Typography padding={[0, 0, 0, 10]}>{getAction()}</Typography>
            <TouchableBox onPress={() => null}>
              <ImageIcon name={'backArrow'} style={styles.image} />
            </TouchableBox>
          </Box>
        </Box>
      </Box>
    </TouchableBox>
  );
};

const TopicScreen = ({ navigation }) => {
  const [topicExam, setTopicExam] = useState(realm.objects('TopicExam'));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableBox margin={[0, 10]} onPress={handleDecrease}>
          <ImageIcon name="random" square={24} />
        </TouchableBox>
      ),
    });
  });

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
    <Box margin={[0, 16]}>
      <FlatList
        data={topicExam}
        renderItem={renderItem}
        keyExtractor={() => uuid()}
        extraData={topicExam}
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

  child_card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginLeft: 5,
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
