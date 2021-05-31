import React from 'react';
import Box from '@src/components/Box';
import HeaderLeft from '@src/components/HeaderLeft';
// import useFlatList from '@src/hooks/useFlatList';
// import { getTrafficSigns } from './service';

const TrafficSignsScreen = () => {
  // const { flatListProps } = useFlatList(
  //   (lastResult) =>
  //     getTrafficSigns({
  //       current: lastResult?.current,
  //       totalPages: lastResult?.totalPages,
  //     }),
  //   {
  //     loadMore: true,
  //     debounceInterval: 250,
  //     isNoMore: (e) => {
  //       return e?.current >= e?.totalPages;
  //     },
  //   },
  // );

  return (
    <Box flex={1} margin={[0, 16]}>
      <Box margin={[50, 0, 0, 0]} flexDirection="row" justify="space-between">
        <HeaderLeft />
      </Box>
    </Box>
  );
};

export default TrafficSignsScreen;
