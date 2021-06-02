import React, { useState, useCallback } from 'react';
import Box from '@src/components/Box';
import Typography from '@src/components/Typography';
import TouchableBox from '@src/components/TouchableBox';
import { StyleSheet } from 'react-native';
const DropDown = ({ title, content }) => {
  const [visible, setVisible] = useState(false);

  const onPress = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <Box
      background="#ffffff"
      margin={[16, 0, 0, 0]}
      padding={[8, 0]}
      borderRadius={20}
    >
      <TouchableBox onPress={onPress} style={styles.height} justify="center">
        <Typography
          fontSize={14}
          padding={[0, 16, 0, 0]}
          style={styles.fontWeight}
        >
          {title}
        </Typography>
      </TouchableBox>
      {visible && (
        <Box>
          <Typography fontSize={13} style={styles.paddingHorizontal}>
            {content}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  paddingHorizontal: { paddingHorizontal: 16 },
  height: { height: 44 },
  fontWeight: { fontWeight: '600' },
});

export default DropDown;
