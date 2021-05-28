import React, { useCallback } from 'react';
import TouchableBox from '@src/components/TouchableBox';
import ImageIcon from '@src/components/ImageIcon';

import { useNavigation } from '@react-navigation/native';

const HeaderLeft = () => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <TouchableBox square={24} onPress={goBack} justify="center" align="center">
      <ImageIcon name="backArrow" square={24} />
    </TouchableBox>
  );
};

export default HeaderLeft;
