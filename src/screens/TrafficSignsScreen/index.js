import React from 'react';
import Box from '@src/components/Box';
import HeaderLeft from '@src/components/HeaderLeft';
// import useFlatList from '@src/hooks/useFlatList';
// improt

const TrafficSignsScreen = () => {
  // const { flatListProps } = useFlatList(
  //   (lastResult) =>
  //     searchShopService({
  //       searchText: searchInput,
  //       provinceId: 0,
  //       countryCode: HomeReducer.userInfo.country_code,
  //       current: lastResult?.current,
  //       data: lastResult?.data,
  //       perKeySearch: lastResult?.perKeySearch,
  //     }),
  //   {
  //     refreshDeps: [searchInput],
  //     loadMore: true,
  //     debounceInterval: 250,
  //     isNoMore: (e) => {
  //       return e?.data?.shops?.length > 0;
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
