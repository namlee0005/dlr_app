import React, { useEffect } from 'react';

import 'react-native-gesture-handler';
import { StoreProvider } from '@src/store';
import Routes from '@src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { AdManager } from 'react-native-admob-native-ads';

AdManager.setRequestConfiguration({
  tagForChildDictingTreatment: false,
  tagForUnderAgeConsent: false,
});

const App = () => {
  // eslint-disable-next-line no-console
  console.disableYellowBox = true;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
