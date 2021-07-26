import React, { useState, useCallback } from 'react';
import Box from '@src/components/Box';
import HeaderLeft from '@src/components/HeaderLeft';
import TabBar from './TabBar';
import DropDown from './DropDown';
import { tips } from '@src/utils/constant';
import { ScrollView } from 'react-native-gesture-handler';
import AdView from '@src/components/AdView';
import { Platform } from 'react-native';

const TipsScreen = () => {
  const [isPractice, setPractice] = useState(false);

  const renderUI = useCallback(() => {
    if (!isPractice) {
      return (
        <ScrollView flex={1}>
          <DropDown title={'Khái niệm và quy tắc'} content={tips.tips1} />
          <DropDown title={'Hệ thống biển báo'} content={tips.tips2} />
          <DropDown title={'Sa hình'} content={tips.tips3} />
        </ScrollView>
      );
    }
    return (
      <ScrollView flex={1}>
        <DropDown title={'Thực hành'} content={tips.tips4} />
      </ScrollView>
    );
  }, [isPractice]);

  return (
    <Box flex={1} margin={[0, 16]}>
      <Box
        margin={[Platform.OS === 'ios' ? 50 : 30, 0, 0, 0]}
        flexDirection="row"
        justify="space-between"
      >
        <HeaderLeft />
      </Box>
      <TabBar setPractice={setPractice} />
      {renderUI()}
      <AdView type="image" media={false} />
    </Box>
  );
};

export default TipsScreen;
