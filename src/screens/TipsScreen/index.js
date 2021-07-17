import React, { useState } from 'react';
import Box from '@src/components/Box';
import HeaderLeft from '@src/components/HeaderLeft';
import TabBar from './TabBar';
import DropDown from './DropDown';
import { tips } from '@src/utils/constant';
import { ScrollView } from 'react-native-gesture-handler';
import AdView from '@src/components/AdView';
const TipsScreen = () => {
  const [isPractice, setPractice] = useState(false);

  return (
    <Box flex={1} margin={[0, 16]}>
      <Box margin={[50, 0, 0, 0]} flexDirection="row" justify="space-between">
        <HeaderLeft />
      </Box>
      <TabBar setPractice={setPractice} />
      {!isPractice ? (
        <ScrollView flex={1}>
          <DropDown title={'Khái niệm và quy tắc'} content={tips.tips1} />
          <DropDown title={'Hệ thống biển báo'} content={tips.tips2} />
          <DropDown title={'Sa hình'} content={tips.tips3} />
        </ScrollView>
      ) : (
          <ScrollView flex={1}>
            <DropDown title={'Thực hành'} content={tips.tips4} />
          </ScrollView>
        )}
      <AdView type="image" media={false} />
    </Box>
  );
};

export default TipsScreen;
