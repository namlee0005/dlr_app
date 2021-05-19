import { ImageProps } from 'react-native';

interface ImageIconProps extends ImageProps {
  square: number;
  circle: number;
  name:
    | 'backArrow'
    | 'book'
    | 'brain'
    | 'carWifi'
    | 'checklist'
    | 'chevronLeft'
    | 'chevronLeftPurple'
    | 'chevronRight'
    | 'chevronRightGray'
    | 'chevronRightPurple'
    | 'delete'
    | 'directionBoard'
    | 'document'
    | 'download'
    | 'driver'
    | 'eLearning'
    | 'email'
    | 'menu'
    | 'random'
    | 'rating'
    | 'rightArrow'
    | 'scale'
    | 'share'
    | 'talk'
    | 'trafficLights'
    | 'trash'
    | 'vote'
    | 'warning';
}

export default function ImageIcon(props: ImageIconProps): {};
