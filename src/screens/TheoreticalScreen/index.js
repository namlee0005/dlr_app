import React, { useCallback } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import ImageIcon from '@src/components/ImageIcon';
import TouchableBox from '@src/components/TouchableBox';

const TARBAR_WIDTH = Dimensions.get('window').width - 24 - 130 - 10;

const data = [
  {
    id: 1,
    title: '20 CÂU HỎI ĐIỂM LIỆT',
    content: '20 câu hỏi điểm liệt',
    image: 'warning',
    total: 20,
    index: 10,
    questions: [
      {
        quest: 'Cau hoi 1',
        answer: [
          { stt: 1, content: 'Dap an A' },
          { stt: 2, content: 'Dap an B' },
          { stt: 3, content: 'Dap an C' },
          { stt: 4, content: 'Dap an D' },
        ],
        explain: 'ExamScreen.js',
        correct: 1,
        image: 'book',
        selected: 2,
      },
      {
        quest: 'Cau hoi 2',
        answer: [
          { stt: 1, content: 'Dap an A' },
          { stt: 2, content: 'Dap an B' },
          { stt: 3, content: 'Dap an C' },
        ],
        explain: 'ExamScreen.js',
        correct: 1,
      },
      {
        quest: 'Cau hoi 3',
        answer: [
          { stt: 1, content: 'Dap an A' },
          { stt: 2, content: 'Dap an B' },
        ],
        explain: 'ExamScreen.js',
        correct: 1,
        selected: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'KHÁI NIỆM VÀ QUY TẮC',
    content: 'Gồm 83 câu hỏi',
    content1: '(18 điểm liệt)',
    image: 'checklist',
    total: 83,
    index: 25,
  },
  {
    id: 3,
    title: 'VĂN HOÁ VÀ ĐẠO ĐỨC LÁI XE',
    content: 'Gồm 5 câu hỏi',
    image: 'talk',
    total: 5,
    index: 4,
  },
  {
    id: 4,
    title: 'KỸ THUẬT LÁI XE',
    content: 'Gồm 12 câu hỏi',
    image: 'driver',
    total: 12,
    index: 12,
  },
  {
    id: 5,
    title: 'BIỂN BÁO ĐƯỜNG BỘ',
    content: 'Gồm 65 câu hỏi',
    image: 'directionBoard',
    total: 65,
    index: 65,
  },
  {
    id: 6,
    title: 'SA HÌNH',
    content: 'Gồm 35 câu hỏi',
    image: 'carWifi',
    total: 35,
    index: 0,
  },
];

const Item = ({ item, navigation }) => {
  const onItemPress = useCallback(() => {
    navigation.navigate('TheoreticalDetail');
  }, [navigation]);

  const getColor = useCallback(() => {
    if (item.id === 1) {
      return 'red';
    } else if (item.id === 2) {
      return 'green';
    } else if (item.id === 3) {
      return '#0e7369';
    } else if (item.id === 4) {
      return '#b06b04';
    } else if (item.id === 5) {
      return '#400396';
    }
    return '#305205';
  }, [item]);

  return (
    <TouchableBox
      height={100}
      flexDirection="row"
      margin={[8, 0, 0, 0]}
      onPress={onItemPress}
    >
      <Box
        background={getColor()}
        borderRadius={[20, 0, 20, 0]}
        width={50}
        justify="center"
        align="center"
      >
        <ImageIcon
          name={item.image}
          height={28}
          width={30}
          resizeMode="contain"
        />
      </Box>
      <Box padding={[8, 8, 8, 0]} background="white" flex={1}>
        <Typography margin={[0, 0, 4, 0]}>{item.title}</Typography>
        <Typography fontSize={12} color="gray" margin={[0, 0, 4, 0]}>
          {item.content} <Typography>{item.content1}</Typography>
        </Typography>
        <Box flexDirection="row" align="center" margin={[8, 0, 0, 0]}>
          <Box
            height={4}
            width={TARBAR_WIDTH}
            background="gray"
            borderRadius={2}
            flexDirection="row"
          >
            <Box
              height={4}
              width={(TARBAR_WIDTH / item.total) * item.index}
              background="green"
              borderRadius={2}
            />
          </Box>
        </Box>
      </Box>

      <Box width={80} borderRadius={[0, 20]} background="white">
        <Typography margin={[0, 0, 4, 0]} />
        <Typography fontSize={12} color="gray" margin={[0, 0, 4, 0]} />
        <Typography margin={[12, 12, 0, 0]}>
          {item.index} / {item.total}
        </Typography>
      </Box>
    </TouchableBox>
  );
};

const TheoreticalScreen = ({ navigation }) => {
  const renderItem = useCallback(
    ({ item }) => {
      return <Item item={item} navigation={navigation} />;
    },
    [navigation],
  );

  return (
    <Box flex={1} margin={[0, 12]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.contentContainerStyle}
      />
    </Box>
  );
};

export default TheoreticalScreen;

const styles = StyleSheet.create({
  contentContainerStyle: { flexGrow: 0 },
});
