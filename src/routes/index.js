import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@src/screens/SplashScreen';
import MainDrawer from './Drawer';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        headerMode={'none'}
        screenOptions={() => ({ gestureEnabled: false })}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
