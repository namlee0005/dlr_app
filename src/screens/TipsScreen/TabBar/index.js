import React, { useCallback, useState, useRef } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { v4 as uuid } from 'uuid';
import Underlined from '@src/components/Underlined';
const data = [
  { type: 1, name: 'Mẹo lý thuyết', selected: true },
  { type: 2, name: 'Mẹo thực hành', selected: false },
];

const DEVICE = Dimensions.get('window');

const TabBar = ({ setPractice }) => {
  const [tabBarData, setTabBarData] = useState(data);

  const refFlatList = useRef(null);

  const renderItem = useCallback(
    ({ item }) => {
      const onPress = () => {
        const temp = [...tabBarData];
        temp.map((i) =>
          i.type === item?.type ? (i.selected = true) : (i.selected = false),
        );
        setTabBarData(temp);
        refFlatList.current.scrollToIndex({
          animated: true,
          index: item?.type - 1,
        });
        setPractice(item.type !== 1);
      };
      return (
        <Box width={DEVICE.width / 2 - 16}>
          <TouchableBox onPress={onPress} margin={[0, 0, 5, 0]} align="center">
            <Typography
              color={item?.selected ? '#302EA7' : null}
              style={styles.fontWeight}
              fontSize={14}
            >
              {item?.name}
            </Typography>
          </TouchableBox>
          {item?.selected && <Underlined color="#302EA7" />}
        </Box>
      );
    },
    [setPractice, tabBarData],
  );

  return (
    <Box margin={[16, 0]}>
      <FlatList
        ref={refFlatList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        data={tabBarData}
        renderItem={renderItem}
        keyExtractor={() => uuid()}
        extraData={tabBarData}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  fontWeight: { fontWeight: '600' },
});

export default TabBar;
