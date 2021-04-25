import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '@src/utils/colors';
import Box from '../Box';

const Input = ({ boxStyle, inputStyle, type, prefix, suffix, ...rest }) => {
  const additionalProps =
    type === 'textArea'
      ? {
          multiline: true,
          numberOfLines: 2,
        }
      : {};

  return (
    <Box
      flexDirection="row"
      style={[
        styles.defaultStyle,
        type === 'textArea' && styles.textArea,
        boxStyle,
      ]}
    >
      {prefix}
      <Box flexDirection="row" flex={1} padding={[0, 4]} align="center">
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={255}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor={colors.ZT_normal_grey_2}
          selectionColor={colors.ZT_black}
          style={[styles.inputDefaultStyle, inputStyle]}
          {...additionalProps}
          {...rest}
        />
      </Box>
      {suffix}
    </Box>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.ZT_normal_grey_2,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 18,
    width: '100%',
  },
  inputDefaultStyle: { flex: 1, paddingVertical: 0 },
  textArea: { height: 64 },
  color: (color) => {
    return { color };
  },
  fontSize: (size) => {
    return { fontSize: size };
  },
  fontFamily: (fontFamily) => {
    return { fontFamily };
  },
});

export default Input;
