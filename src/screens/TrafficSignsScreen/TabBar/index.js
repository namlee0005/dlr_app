import React, { useCallback, useState, useRef } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import { FlatList } from 'react-native';
import { v4 as uuid } from 'uuid';
import Underlined from '@src/components/Underlined';
import { bbc, bbnh, bp, bhl, bcd } from '@src/utils/constant';
const data = [
  { type: 1, name: 'Biển báo cấm', selected: true },
  { type: 2, name: 'Biển hiệu lệnh', selected: false },
  { type: 3, name: 'Biển chỉ dẫn', selected: false },
  { type: 4, name: 'Biển báo nguy hiểm và cảnh báo', selected: false },
  { type: 5, name: 'Biển phụ', selected: false },
];

const TabBar = ({ setImages, index, setIndex }) => {
  const initData = useCallback(() => {
    const temp = [...data];
    setIndex(1);
    temp.map((i) => (i.selected = false));
    temp[0].selected = true;
    return temp;
  }, [setIndex]);
  const [tabBarData, setTabBarData] = useState(index === 0 ? initData() : data);

  const refFlatList = useRef(null);

  const renderItem = useCallback(
    ({ item }) => {
      const onPress = () => {
        const temp = [...tabBarData];
        temp.map((i) =>
          i.type === item?.type ? (i.selected = true) : (i.selected = false),
        );
        setTabBarData(temp);

        switch (item?.type) {
          case 1:
            setImages(bbc);
            break;
          case 2:
            setImages(bhl);
            break;
          case 3:
            setImages(bcd);
            break;
          case 4:
            setImages(bbnh);
            break;
          case 5:
            setImages(bp);
            break;
          default:
            break;
        }

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
    [setImages, tabBarData],
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
