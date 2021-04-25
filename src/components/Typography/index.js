import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { normalizeOptions } from '@src/utils/formatters';

const Typography = ({ style, children, margin, padding, type, ...rest }) => {
  const combinedStyle = [
    'color',
    'fontSize',
    'fontFamily',
    'textAlign',
    'fontStyle',
  ]
    .map((e) => {
      if (!rest[e]) {
        return;
      }
      return styles[e](rest[e]);
    })
    .filter((e) => e);

  return (
    <Text
      style={[
        margin && styles.margin(normalizeOptions(margin)),
        padding && styles.padding(normalizeOptions(padding)),
        type && styles.type(type),
        combinedStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  color: (color) => {
    return { color };
  },
  fontSize: (size) => {
    return { fontSize: size };
  },
  fontFamily: (fontFamily) => {
    return { fontFamily };
  },
  type: (type) => {
    const common = {
      fontStyle: 'normal',
      fontWeight: '400',
      fontFamily: 'Roboto',
    };

    if (type === 'H1') {
      return { ...common, fontSize: 38, lineHeight: 46 };
    }
    if (type === 'H2') {
      return { ...common, fontSize: 30, lineHeight: 38 };
    }
    if (type === 'H3') {
      return { ...common, fontSize: 24, lineHeight: 32 };
    }
    if (type === 'H4') {
      return { ...common, fontSize: 20, lineHeight: 28 };
    }
    if (type === 'C1') {
      return { ...common, fontSize: 18, lineHeight: 26 };
    }
    if (type === 'C2') {
      return { ...common, fontSize: 16, lineHeight: 24 };
    }
    if (type === 'C3') {
      return { ...common, fontSize: 14, lineHeight: 22 };
    }
    if (type === 'C4') {
      return { ...common, fontSize: 12, lineHeight: 16 };
    }
    if (type === 'C5') {
      return { ...common, fontSize: 10, lineHeight: 14 };
    }
    if (type === 'C6') {
      return { ...common, fontSize: 8, lineHeight: 12 };
    }

    return;
  },
  fontStyle: (fontStyle) => {
    if (fontStyle === 'bold') {
      return { fontWeight: '700' };
    }
    return;
  },
  margin: ([top, left, bottom, right]) => {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  },
  padding: ([top, left, bottom, right]) => {
    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    };
  },
  textAlign: (align) => {
    return {
      textAlign: align,
    };
  },
});
