import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageIcon from '@src/components/ImageIcon';
import HomeStack from '../Stack';

const Drawer = createDrawerNavigator();
const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.vContainer}>
        <Text style={styles.vText}>ÔN THI GPLX</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <ImageIcon name="eLearning" style={styles.image} />
        <Text>Hướng dẫn sử dụng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <ImageIcon name="email" style={styles.image} />
        <Text>Email hỗ trợ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <ImageIcon name="download" style={styles.image} />
        <Text>Các ứng dụng khác</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <ImageIcon name="share" style={styles.image} />
        <Text>Chia sẻ ứng dụng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <ImageIcon name="vote" style={styles.image} />
        <Text>Đánh giá ứng dụng</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { marginLeft: 15 },
  vContainer: { paddingTop: 10, paddingBottom: 20 },
  vText: { fontSize: 35, fontWeight: '700' },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { height: 24, width: 24, marginRight: 15 },
});

export default MainDrawer;
