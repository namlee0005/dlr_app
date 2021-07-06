import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@src/screens/SplashScreen';
import MainDrawer from './Drawer';
import ModalTitleNew from '@src/screens/ModalScreen/ModalTitleNew';

const Stack = createStackNavigator();

const ModalStyleInterpolator = ({ layouts, current: { progress } }) => {
  return {
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp',
      }),
    },
    cardStyle: {
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
  };
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        headerMode={'none'}
        mode="modal"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={null}
        />
        <Stack.Screen
          name="MainApp"
          component={MainDrawer}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="ModalTitleNew"
          component={ModalTitleNew}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardStyleInterpolator: ModalStyleInterpolator,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
