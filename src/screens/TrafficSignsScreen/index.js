import React, { useCallback, useState } from 'react';
import Box from '@src/components/Box';
import HeaderLeft from '@src/components/HeaderLeft';
import useFlatList from '@src/hooks/useFlatList';
import { getTrafficSigns } from './service';
import { Dimensions, FlatList } from 'react-native';
import { URL_IMAGE } from '@src/apis/BE';
import AutoHeightImage from 'react-native-auto-height-image';
import TabBar from './TabBar';
const DEVICE = Dimensions.get('window');

const TrafficSignsScreen = () => {
  const [type, setType] = useState(1);

  const { flatListProps } = useFlatList(
    (lastResult) =>
      getTrafficSigns({
        type: type,
        current: lastResult?.current,
        totalPages: lastResult?.totalPages,
      }),
    {
      refreshDeps: [type],
      loadMore: true,
      debounceInterval: 250,
      isNoMore: (e) => {
        return e?.current >= e?.totalPages;
      },
    },
  );

  const renderItem = useCallback(({ item }) => {
    return (
      <Box align="center" justify="center" margin={[0, 0, 8, 0]}>
        <AutoHeightImage
          source={{
            uri: URL_IMAGE + item?.urlImage,
          }}
          width={DEVICE.width - 32}
        />
      </Box>
    );
  }, []);

  return (
    <Box flex={1} margin={[0, 16]}>
      <Box margin={[50, 0, 0, 0]} flexDirection="row" justify="space-between">
        <HeaderLeft />
      </Box>
      <TabBar setType={setType} />
      <Box flex={1}>
        <FlatList
          {...flatListProps}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

export default TrafficSignsScreen;
