import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const BarStyle = ({ barStyle }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle(barStyle);
    }
  }, [barStyle, isFocused]);

  return null;
};

export default BarStyle;
