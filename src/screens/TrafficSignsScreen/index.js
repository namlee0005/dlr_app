import React, { useCallback, useState } from 'react';
import Box from '@src/components/Box';
import HeaderLeft from '@src/components/HeaderLeft';
import { Dimensions, FlatList, Platform } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import TabBar from './TabBar';
import { bbc } from '@src/utils/constant';
import resources from '@src/components/ImageIcon/resources';
const DEVICE = Dimensions.get('window');

const TrafficSignsScreen = () => {
  const [images, setImages] = useState(bbc);
  const renderItem = useCallback(({ item }) => {
    const uri = resources[item?.image];
    return uri ? (
      <Box align="center" justify="center" margin={[0, 0, 8, 0]}>
        <AutoHeightImage source={uri} width={DEVICE.width - 32} />
      </Box>
    ) : null;
  }, []);

  return (
    <Box flex={1} margin={[0, 16]}>
      <Box
        margin={[Platform.OS === 'ios' ? 50 : 30, 0, 0, 0]}
        flexDirection="row"
        justify="space-between"
      >
        <HeaderLeft />
      </Box>
      <TabBar setImages={setImages} />
      <Box flex={1}>
        <FlatList
          data={images}
          keyExtractor={(item) => item?.id}
          renderItem={renderItem}
          extraData={images}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

export default TrafficSignsScreen;
