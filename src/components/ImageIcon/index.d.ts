import { ImageProps } from 'react-native';

interface ImageIconProps extends ImageProps {
  square: number;
  circle: number;
  name:
    | 'backArrow'
    | 'background'
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
    | 'menuAnswer'
    | 'random'
    | 'rating'
    | 'rightArrow'
    | 'scale'
    | 'share'
    | 'sync'
    | 'talk'
    | 'task'
    | 'trafficLights'
    | 'trash'
    | 'vote'
    | 'warning';
}

export default function ImageIcon(props: ImageIconProps): {};
