import * as React from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import { StyleSheet } from 'react-native';

const CircleExam = ({
  percent,
  color,
  width,
  strokeWidth = 2,
  answered,
  total,
}) => {
  const size = width;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const { PI } = Math;
  const circumference = r * 2 * PI;

  return (
    <Box width={size} height={size}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={cx}>
          <Circle
            stroke="rgb(224, 224, 224)"
            fill="none"
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
          />
          <Circle
            stroke={color || 'red'}
            fill="none"
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (circumference * (answered / total) * 100) / 100
            }
          />
        </G>
      </Svg>
      <Box style={styles.text}>
        <Typography type="C4">
          {answered}/{total}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircleExam;
