import React, { useCallback, useState, useRef } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import { FlatList } from 'react-native';
import { v4 as uuid } from 'uuid';
import Underlined from '@src/components/Underlined';
const data = [
  { type: 1, name: 'Biển báo cấm', selected: true },
  { type: 2, name: 'Biển hiệu lệnh', selected: false },
  { type: 3, name: 'Biển chỉ dẫn', selected: false },
  { type: 4, name: 'Biển báo nguy hiểm và cảnh báo', selected: false },
  { type: 5, name: 'Biển phụ', selected: false },
];

const TabBar = ({ setType }) => {
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
        setType(item?.type);
        refFlatList.current.scrollToIndex({
          animated: true,
          index: item?.type - 1,
        });
      };
      return (
        <Box margin={[0, 0, 0, 8]}>
          <TouchableBox onPress={onPress} margin={[0, 0, 2, 0]}>
            <Typography color={item?.selected ? '#302EA7' : null}>
              {item?.name}
            </Typography>
          </TouchableBox>
          {item?.selected && <Underlined color="#302EA7" />}
        </Box>
      );
    },
    [setType, tabBarData],
  );

  return (
    <Box margin={[16, 0]}>
      <FlatList
        ref={refFlatList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={tabBarData}
        renderItem={renderItem}
        keyExtractor={() => uuid()}
        extraData={tabBarData}
      />
    </Box>
  );
};

export default TabBar;
