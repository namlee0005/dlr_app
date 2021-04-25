import { TextProps } from 'react-native';

type FontFamily =
  | 'Roboto-Medium'
  | 'Roboto-Regular'
  | 'Roboto-Bold'
  | 'Roboto-Light';

interface TypographyProps extends TextProps {
  color: string;
  fontFamily: FontFamily;
  fontSize: number;
  fontStyle: 'bold' | 'normal';
  type: 'H1' | 'H2' | 'H3' | 'H4' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  margin: number | [number, number] | [number, number, number, number];
  padding: number | [number, number] | [number, number, number, number];
  textAlign: 'left' | 'right' | 'center';
}

export default function Typography(props: TypographyProps): {};
