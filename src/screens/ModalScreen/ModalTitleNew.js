import React, { useCallback } from 'react';
import Typography from '@src/components/Typography';
import Box from '@src/components/Box';
import { StyleSheet, Dimensions } from 'react-native';
import colors from '@src/utils/colors';
import TouchableBox from '@src/components/TouchableBox';

const DEVICE_WIDTH = Dimensions.get('window').width;

const ModalTitleNew = ({ navigation, route }) => {
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <Box flex={1} padding={[0, 16]} align="center" justify="center">
      <Box
        background={colors.white}
        width="100%"
        style={styles.box}
        padding={[0, 16]}
      >
        <Typography>BỘ ĐỀ THI MỚI</Typography>
        <Typography>Áp dụng từ ngày 01-08-2020</Typography>
        <Typography>
          Cập nhật bàn chính thức bộ câu hòi dùng cho đào tạo, sát hạch giấy
          phép lái xe A1 của Tổng cục Đường bộ phát hành.
        </Typography>

        <Typography>
          Tổng số câu hỏi ôn thi bằng A1 là 200 câu. Mỗi đề thi gồm có 25 câu
          hòi. Thí sinh làm bài trong thời gian 19 phút và phải đạt 21/25 câu
          đúng và không sai câu điểm liệt nào.
        </Typography>

        <TouchableBox onPress={goBack}>
          <Typography>Đã hiểu</Typography>
        </TouchableBox>
        <Typography />
      </Box>
    </Box>
  );
};

export default ModalTitleNew;

const styles = StyleSheet.create({
  box: { borderRadius: 4 },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  boxStyle: {
    height: 128,
    backgroundColor: colors.ZT_light_grey_1,
    borderWidth: 0,
    marginTop: 4,
  },
  inputStyle: { height: 128, paddingTop: 8 },
  button: {
    width: (DEVICE_WIDTH - 64) / 2 - 4,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.ZT_red,
  },
  buttonOk: {
    width: (DEVICE_WIDTH - 64) / 2 - 4,
    height: 40,
    backgroundColor: colors.ZT_green,
    borderRadius: 8,
  },
});
