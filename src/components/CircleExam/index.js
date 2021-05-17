import * as React from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';

const CircleExam = ({ percent, color, width, strokeWidth = 2 }) => {
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
            strokeDashoffset={circumference - (circumference * percent) / 100}
          />
        </G>
      </Svg>
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>20/20</Typography>
      </Box>
    </Box>
  );
};

export default CircleExam;
