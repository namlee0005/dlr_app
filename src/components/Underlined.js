import React from 'react';
import { StyleSheet } from 'react-native';
import Box from './Box';

const Underlined = ({ style, color }) => {
  return <Box style={[styles.container, style, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  container: { height: 1.5, backgroundColor: '#000000' },
});

export default Underlined;
