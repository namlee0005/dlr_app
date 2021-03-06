import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@src/screens/HomeScreen';
import TopicScreen from '@src/screens/TopicScreen';
import ExamScreen from '@src/screens/TopicScreen/ExamScreen';
import TheoreticalScreen from '@src/screens/TheoreticalScreen';
import TheoreticalDetail from '@src/screens/TheoreticalScreen/TheoreticalDetail';
import TrafficSignsScreen from '@src/screens/TrafficSignsScreen';
import TipsScreen from '@src/screens/TipsScreen';
import QuestionFails from '@src/screens/QuestionFails';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TopicScreen"
        component={TopicScreen}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen
        name="ExamScreen"
        component={ExamScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TheoreticalScreen"
        component={TheoreticalScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TheoreticalDetail"
        component={TheoreticalDetail}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TrafficSignsScreen"
        component={TrafficSignsScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TipsScreen"
        component={TipsScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="QuestionFails"
        component={QuestionFails}
        options={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
