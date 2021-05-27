import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '@src/screens/HomeScreen';
import TopicScreen from '@src/screens/TopicScreen';
import ExamScreen from '@src/screens/TopicScreen/ExamScreen';
import TouchableBox from '@src/components/TouchableBox';
import ImageIcon from '@src/components/ImageIcon';
import capitalize from 'lodash/capitalize';
import TheoreticalScreen from '@src/screens/TheoreticalScreen';
import TheoreticalDetail from '@src/screens/TheoreticalScreen/TheoreticalDetail';
const Stack = createStackNavigator();

const HeaderLeft = () => {
  const navigation = useNavigation();
  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <TouchableBox square={40} onPress={goBack} justify="center" align="center">
      <ImageIcon name="backArrow" square={24} />
    </TouchableBox>
  );
};

const HomeStack = () => {
  const headerLeft = useCallback(() => <HeaderLeft />, []);

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
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
        options={{ title: 'Thi sát hạch', headerLeft }}
      />
      <Stack.Screen
        name="ExamScreen"
        component={ExamScreen}
        options={({ route }) => ({
          headerTransparent: true,
          title: capitalize(route?.params?.exam?.title),
          headerLeft,
        })}
      />
      <Stack.Screen
        name="TheoreticalScreen"
        component={TheoreticalScreen}
        options={{
          title: 'Học lý thuyết',
          headerLeft,
        }}
      />
      <Stack.Screen name="TheoreticalDetail" component={TheoreticalDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
