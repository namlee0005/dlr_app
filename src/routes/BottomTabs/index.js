// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '@src/screens/Home';
// import Account from '@src/screens/Account';
// import ZotaChat from '@src/screens/ZotaChat';
// import MarketPlace from '@src/screens/MarketPlace';
// import ImageIcon from '@src/components/ImageIcon';
// import colors from '@src/utils/colors';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused }) => {
//           let iconName;
//           if (route.name === 'Home') {
//             iconName = focused ? 'homeActive' : 'homeInactive';
//           } else if (route.name === 'ZotaChat') {
//             iconName = focused ? 'chatActive' : 'chatInactive';
//           } else if (route.name === 'Account') {
//             iconName = focused ? 'accountActive' : 'accountInactive';
//           } else if (route.name === 'MarketPlace') {
//             iconName = focused ? 'marketplaceActive' : 'marketplaceInactive';
//           }
//           return <ImageIcon name={iconName} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: colors.darkBlue,
//         inactiveTintColor: colors.gray,
//       }}
//       initialRouteName="Home">
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="MarketPlace" component={MarketPlace} />
//       <Tab.Screen name="ZotaChat" component={ZotaChat} />
//       <Tab.Screen name="Account" component={Account} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabs;
