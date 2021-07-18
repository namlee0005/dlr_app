import React, { useCallback, useState, useEffect } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import { FlatList, Dimensions, StyleSheet, Platform } from 'react-native';
import ImageIcon from '@src/components/ImageIcon';
import TouchableBox from '@src/components/TouchableBox';
import realm from '@src/realms/realm';
import HeaderLeft from '@src/components/HeaderLeft';
import AdView from '@src/components/AdView';

const TAR_BAR_WIDTH = Dimensions.get('window').width - 24 - 130 - 10 - 8;

const data = [
  {
    id: 2,
    title: '20 câu hỏi điểm liệt',
    content: 'Gồm 20 câu hỏi',
    image: 'warning',
  },
  {
    id: 1,
    title: 'Khái niệm và quy tắc',
    content: 'Gồm 83 câu hỏi',
    content1: '(18 điểm liệt)',
    image: 'checklist',
  },
  {
    id: 3,
    title: 'Văn hóa và đạo đức lái xe',
    content: 'Gồm 5 câu hỏi',
    image: 'talk',
  },
  {
    id: 4,
    title: 'Kỹ thuật lái xe',
    content: 'Gồm 12 câu hỏi',
    image: 'driver',
  },
  {
    id: 5,
    title: 'Biển báo đường bộ',
    content: 'Gồm 65 câu hỏi',
    image: 'directionBoard',
  },
  {
    id: 6,
    title: 'Sa hình',
    content: 'Gồm 35 câu hỏi',
    image: 'carWifi',
  },
];

const Item = ({ item, navigation, examTheoretical }) => {
  const onItemPress = useCallback(() => {
    navigation.navigate('TheoreticalDetail', {
      id: item?.id,
      title: item?.title,
    });
  }, [item, navigation]);

  const getIndex = useCallback(() => {
    let arr = examTheoretical
      .map((i) => i)
      .filter((i) => i.type === item?.id && i.selected !== -1);
    return arr.length;
  }, [examTheoretical, item?.id]);

  const getTotal = useCallback(() => {
    let arr = examTheoretical.map((i) => i).filter((i) => i.type === item?.id);
    return arr.length;
  }, [examTheoretical, item?.id]);

  return (
    <TouchableBox
      flexDirection="row"
      align="center"
      justify="center"
      padding={[4, 16]}
      margin={[16, 0, 0, 0]}
      onPress={onItemPress}
      background="white"
      borderRadius={16}
      shadowDepth={0.8}
    >
      <Box background="white">
        <ImageIcon
          name={item.image}
          resizeMode="contain"
          style={styles.images}
        />
      </Box>

      <Box padding={[8, 16, 8, 0]} flex={1}>
        <Typography margin={[0, 0, 4, 0]} fontSize={16}>
          {item.title}
        </Typography>
        <Typography fontSize={12} color="gray" margin={[0, 0, 4, 0]}>
          {item.content} <Typography>{item.content1}</Typography>
        </Typography>
        <Box flexDirection="row" align="center" margin={[8, 0, 0, 0]}>
          <Box
            height={4}
            width={TAR_BAR_WIDTH}
            background="rgba(130, 130, 130, 0.2)"
            borderRadius={2}
            flexDirection="row"
          >
            <Box
              height={4}
              width={(TAR_BAR_WIDTH / getTotal()) * getIndex()}
              background="#302EA7"
              borderRadius={2}
            />
          </Box>
        </Box>
      </Box>

      <Box borderRadius={[0, 20]} background="white">
        <Typography margin={[0, 0, 4, 0]} />
        <Typography fontSize={12} color="gray" margin={[0, 0, 4, 0]} />
        <Typography margin={[12, 12, 0, 0]} fontSize={12}>
          {getIndex()} / {getTotal()}
        </Typography>
      </Box>
    </TouchableBox>
  );
};

const HeaderRight = () => {
  const onReset = useCallback(() => {
    realm.objects('Theoretical').map((i) => {
      realm.write(() => {
        i.selected = -1;
      });
    });
  }, []);

  return (
    <TouchableBox margin={[0, 0, 0, 16]} onPress={onReset}>
      <ImageIcon name="sync" square={24} />
    </TouchableBox>
  );
};

const TheoreticalScreen = ({ navigation }) => {
  const [examTheoretical, setExamTheoretical] = useState(
    realm.objects('Theoretical'),
  );

  useEffect(() => {
    realm.addListener('change', () => {
      setExamTheoretical(realm.objects('Theoretical'));
    });
    return () => {
      realm.removeAllListeners();
    };
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Item
          item={item}
          navigation={navigation}
          examTheoretical={examTheoretical}
        />
      );
    },
    [navigation, examTheoretical],
  );

  return (
    <Box flex={1} margin={[0, 16]}>
      <Box
        margin={[Platform.OS === 'ios' ? 50 : 30, 0, 0, 0]}
        flexDirection="row"
        justify="space-between"
      >
        <HeaderLeft />
        <HeaderRight />
      </Box>
      <Box flex={1}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={examTheoretical}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <AdView type="image" media={false} />
    </Box>
  );
};

const styles = StyleSheet.create({
  images: { height: 48, width: 48 },
});

export default TheoreticalScreen;
