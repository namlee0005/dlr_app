import React, { useContext, useCallback } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { StoreContext } from '@src/store';
import ImageIcon from '@src/components/ImageIcon';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import colors from '@src/utils/colors';
import useRealms from '@src/hooks/useRealms';
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ItemHome = ({ item, navigation, length }) => {
  const onItemPress = useCallback(
    ({ id }) => {
      switch (id) {
        case 1:
          navigation.navigate('TopicScreen');
          break;
        case 2:
          navigation.navigate('TheoreticalScreen');
          break;
      }
    },
    [navigation],
  );

  return (
    <TouchableBox
      flex={0.3}
      onPress={() => onItemPress(item)}
      borderRadius={20}
      background={'white'}
      margin={[0, 0, 20, 0]}
    >
      <Box margin={[10, 10]} height={DEVICE_HEIGHT / 5}>
        <Box align="center">
          <ImageIcon name={item.image} style={styles.icon} />
        </Box>
        <Typography>{item.title}</Typography>
        <Typography color={colors.gray} margin={[10, 0, 0, 0]}>
          {item.id === 1 ? `${length} đề thi` : item.content}
        </Typography>
      </Box>
    </TouchableBox>
  );
};

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(StoreContext);
  const data1 = useRealms('TopicExam');
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ItemHome item={item} navigation={navigation} length={data1.length} />
      );
    },
    [navigation, data1],
  );

  return (
    <Box flex={1} padding={[0, 15]}>
      <Box margin={[10, 0]}>
        <Typography>
          Xe không có thắng - chạy thẳng vào hòm. Xe không có thắng - chạy thẳng
          vào hòm.
        </Typography>
      </Box>
      <FlatList
        data={state?.cardHome}
        horizontal={false}
        columnWrapperStyle={styles.row}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.contentContainerStyle}
        scrollEnabled={false}
      />
      {/* quang cao     */}
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: { height: 50, width: 50, marginBottom: 10 },
  contentContainerStyle: { flexGrow: 0 },
});
