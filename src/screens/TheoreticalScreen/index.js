import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import { FlatList, Dimensions } from 'react-native';
import ImageIcon from '@src/components/ImageIcon';
import TouchableBox from '@src/components/TouchableBox';
import realm from '@src/realms/realm';

const TAR_BAR_WIDTH = Dimensions.get('window').width - 24 - 130 - 10;

const data = [
  {
    id: 2,
    title: '20 CÂU HỎI ĐIỂM LIỆT',
    content: '20 câu hỏi điểm liệt',
    image: 'warning',
  },
  {
    id: 1,
    title: 'KHÁI NIỆM VÀ QUY TẮC',
    content: 'Gồm 83 câu hỏi',
    content1: '(18 điểm liệt)',
    image: 'checklist',
  },
  {
    id: 3,
    title: 'VĂN HOÁ VÀ ĐẠO ĐỨC LÁI XE',
    content: 'Gồm 5 câu hỏi',
    image: 'talk',
  },
  {
    id: 4,
    title: 'KỸ THUẬT LÁI XE',
    content: 'Gồm 12 câu hỏi',
    image: 'driver',
  },
  {
    id: 5,
    title: 'BIỂN BÁO ĐƯỜNG BỘ',
    content: 'Gồm 65 câu hỏi',
    image: 'directionBoard',
  },
  {
    id: 6,
    title: 'SA HÌNH',
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
            width={TAR_BAR_WIDTH}
            background="gray"
            borderRadius={2}
            flexDirection="row"
          >
            <Box
              height={4}
              width={(TAR_BAR_WIDTH / getTotal()) * getIndex()}
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

  const headerRight = useCallback(() => <HeaderRight />, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [navigation, headerRight]);

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
    <Box flex={1} margin={[0, 12]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={examTheoretical}
      />
    </Box>
  );
};

export default TheoreticalScreen;
