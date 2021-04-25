import React, { useCallback, useState } from 'react';
import Box from '../Box';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import TouchableBox from '../TouchableBox';
import colors from '@src/utils/colors';
import ImageIcon from '../ImageIcon';
import Typography from '../Typography';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import ZTButton from '../ZTButton';
import i18n from '@src/locales';

const DateTime = ({ input }) => {
  const [date, setDate] = useState(
    input.value ? new Date(input.value.valueOf()) : null,
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isModalDate, setModalDate] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    input.onChange(currentDate.valueOf());
  };

  const toggleModalAsset = useCallback(() => {
    setModalDate(!isModalDate);
  }, [isModalDate]);

  const showMode = useCallback((currentMode) => {
    setShow(true);
    setMode(currentMode);
  }, []);

  const showDatepicker = useCallback(() => {
    if (Platform.OS === 'ios') {
      toggleModalAsset();
    } else {
      showMode('date');
    }
  }, [showMode, toggleModalAsset]);

  const hideModal = useCallback(() => {
    if (Platform.OS === 'ios') {
      toggleModalAsset();
    }
  }, [toggleModalAsset]);

  return (
    <Box>
      <TouchableBox
        onPress={showDatepicker}
        flexDirection="row"
        justify="space-between"
        style={styles.default}
      >
        <Typography style={styles.input} color={colors.ZT_normal_grey_1}>
          {date === null
            ? i18n.t('Chọn ngày')
            : dayjs(date).format('DD/MM/YYYY')}
        </Typography>
        <ImageIcon name="schedule" square={16} style={styles.icon} />
      </TouchableBox>
      <Modal animationType="slile" transparent={true} visible={isModalDate}>
        <TouchableWithoutFeedback onPress={toggleModalAsset}>
          <Box flex={1} justify="flex-end" shadowDepth={5}>
            <Box background={colors.ZT_white}>
              <TouchableBox
                title="Hide modal"
                onPress={toggleModalAsset}
                padding={[16, 16]}
              >
                <ImageIcon name="delete" square={14} />
              </TouchableBox>
              <DateTimePicker
                testID="dateTimePicker"
                value={date ? date : isModalDate ? new Date() : null}
                mode={'date'}
                is24Hour={true}
                display="inline"
                onChange={onChange}
              />
              <ZTButton
                type="primary"
                title={i18n.t('Chọn')}
                onPress={hideModal}
                margin={[24, 16]}
              />
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          // value={date}
          value={date ? date : isModalDate ? new Date() : null}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Box>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    paddingLeft: 8,
  },
  icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 8,
  },
  default: {
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.ZT_normal_grey_2,
    height: 32,
  },
});
