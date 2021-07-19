import React, {
  useContext,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  FlatList,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import { StoreContext } from '@src/store';
import ImageIcon from '@src/components/ImageIcon';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import colors from '@src/utils/colors';
import realm from '@src/realms/realm';
// import AdView from '@src/components/AdView';
// import { titleHome } from '@src/utils/constant';
const ItemHome = ({ item, navigation, length, length2 }) => {
  const onItemPress = useCallback(
    ({ id }) => {
      switch (id) {
        case 1:
          navigation.navigate('TopicScreen');
          break;
        case 2:
          navigation.navigate('TheoreticalScreen');
          break;
        case 3:
          navigation.navigate('QuestionFails');
          break;
        case 5:
          navigation.navigate('TrafficSignsScreen');
          break;
        case 6:
          navigation.navigate('TipsScreen');
          break;
      }
    },
    [navigation],
  );

  const getContent = useCallback(() => {
    if (item.id === 1) {
      return `${length} đề thi`;
    }
    if (item.id === 3) {
      return `${length2} câu hỏi sai`;
    }
    return item.content;
  }, [item.content, item.id, length, length2]);

  return (
    <TouchableBox
      onPress={() => onItemPress(item)}
      borderRadius={20}
      background={'white'}
      margin={[0, 0, 20, 0]}
    >
      <Box
        padding={[16, 16]}
        flexDirection="row"
        align="center"
        justify="space-between"
      >
        <Box flexDirection="row" align="center">
          <ImageIcon name={item.image} style={styles.icon} square={56} />
          <Box justify="center" margin={[0, 16, 0, 0]}>
            <Typography fontSize={16} fontStyle="bold">
              {item.title}
            </Typography>
            <Typography color={colors.gray} margin={[4, 0, 0, 0]}>
              {getContent()}
            </Typography>
          </Box>
        </Box>

        <ImageIcon name="chevronRight" square={18} />
      </Box>
    </TouchableBox>
  );
};

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(StoreContext);
  const [length, setlength] = useState(realm.objects('TopicExam')?.length);
  const [length1, setlength1] = useState(
    realm.objects('QuestionsFail')?.length,
  );
  // const [title, setTitle] = useState(
  //   titleHome[Math.floor(Math.random() * titleHome.length)],
  // );
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ItemHome
          item={item}
          navigation={navigation}
          length={length}
          length2={length1}
        />
      );
    },
    [length, length1, navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerLeft: null,
      title: null,
    });
  }, [navigation]);

  const toggleDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setlength(realm.objects('TopicExam')?.length);
      setlength1(realm.objects('QuestionsFail')?.length);
      // setTitle(titleHome[Math.floor(Math.random() * titleHome.length)]);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Thoát App',
        'Bạn có muốn đóng ứng dụng?',
        [
          {
            text: 'Không',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Có',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Box flex={1}>
      <Box background="#302EA7" borderRadius={[0, 0, 24, 24]} padding={[0, 16]}>
        <TouchableBox
          margin={[Platform.OS === 'ios' ? 50 : 30, 0, 0, 0]}
          style={styles.button}
          onPress={toggleDrawer}
        >
          <ImageIcon name="menu" width={24} height={24} />
        </TouchableBox>
        <Box margin={[10, 0]}>
          <Typography color="white" fontSize={20} fontStyle="bold">
            Ôn thi GPLX A1
          </Typography>
        </Box>

        {/* <Typography color="white" padding={[0, 0, 10, 0]}>
          {title}
        </Typography> */}
      </Box>
      <Box flex={1} padding={[16, 16, 0, 16]}>
        <FlatList
          data={state?.cardHome}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        {/* <AdView type="image" media={false} /> */}
      </Box>
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: { height: 50, width: 50 },
  button: { width: 24 },
});
