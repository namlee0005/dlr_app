import { TextInputProps } from 'react-native';

type FontFamily =
  | 'Roboto-Medium'
  | 'Roboto-Regular'
  | 'Roboto-Bold'
  | 'Roboto-Light';

interface InputProps extends TextInputProps {
  color: string;
  fontFamily: FontFamily;
  fontSize: number;
  type: 'textArea';
  prefix: ReactElement;
  suffix: ReactElement;
  boxStyle: any | 'Container input style';
  inputStyle: any | 'Input it self style';
}

export default function Input(props: InputProps): {};
