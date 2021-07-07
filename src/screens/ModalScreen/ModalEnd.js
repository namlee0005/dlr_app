import React, { useCallback } from 'react';
import Typography from '@src/components/Typography';
import Box from '@src/components/Box';
import { StyleSheet } from 'react-native';
import colors from '@src/utils/colors';
import TouchableBox from '@src/components/TouchableBox';

const ModalEnd = ({ navigation, route }) => {
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
        <Box align="center" justify="center" margin={[16, 0]}>
          <Typography fontStyle="bold" fontSize={16} color="rgb(0,227,64)">
            THÔNG BÁO MỚI
          </Typography>
        </Box>
        <Typography fontStyle="bold" margin={[8, 0]}>
          Bộ đề thi mới
        </Typography>
        <Typography margin={[8, 0]}>Áp dụng từ ngày 01-08-2020</Typography>
        <Typography fontSize={13}>
          Cập nhật bàn chính thức bộ câu hòi dùng cho đào tạo, sát hạch giấy
          phép lái xe A1 của Tổng cục Đường bộ phát hành.
        </Typography>

        <Box
          padding={[8, 16]}
          background="rgba(48,46,167, 0.2)"
          borderRadius={16}
          margin={[8, 0]}
        >
          <Typography fontSize={14}>
            Tổng số câu hỏi ôn thi bằng A1 là 200 câu. Mỗi đề thi gồm có 25 câu
            hòi. Thí sinh làm bài trong thời gian 19 phút và phải đạt 21/25 câu
            đúng và không sai câu điểm liệt nào.
          </Typography>
        </Box>

        <TouchableBox
          onPress={goBack}
          justify="center"
          align="center"
          background="rgb(48,46,167)"
          borderRadius={20}
          style={styles.button}
        >
          <Typography color={'white'}>Đã hiểu</Typography>
        </TouchableBox>
        <Typography />
      </Box>
    </Box>
  );
};

export default ModalEnd;

const styles = StyleSheet.create({
  box: { borderRadius: 16 },
  button: {
    height: 40,
    borderRadius: 40,
    backgroundColor: 'rgb(48,46,167)',
    marginTop: 8,
  },
});
