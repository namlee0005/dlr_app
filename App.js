import React from 'react';

import 'react-native-gesture-handler';
import { StoreProvider } from '@src/store';
import Routes from '@src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AdManager } from 'react-native-admob-native-ads';

AdManager.setRequestConfiguration({
  tagForChildDirectedTreatment: false,
});

const App = () => {
  // eslint-disable-next-line no-console
  console.disableYellowBox = true;

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
