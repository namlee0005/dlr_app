import React from 'react';
import { StyleSheet } from 'react-native';
import Box from './Box';

const Underlined = ({ style }) => {
  return <Box style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: { height: 1.5, backgroundColor: '#000000' },
});

export default Underlined;
