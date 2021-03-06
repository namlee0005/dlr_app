import { ImageProps } from 'react-native';

interface ImageIconProps extends ImageProps {
  square: number;
  circle: number;
  name:
    | 'BBC_1'
    | 'BBC_10'
    | 'BBC_11'
    | 'BBC_12'
    | 'BBC_13'
    | 'BBC_14'
    | 'BBC_15'
    | 'BBC_16'
    | 'BBC_17'
    | 'BBC_18'
    | 'BBC_19'
    | 'BBC_2'
    | 'BBC_20'
    | 'BBC_21'
    | 'BBC_22'
    | 'BBC_23'
    | 'BBC_24'
    | 'BBC_25'
    | 'BBC_26'
    | 'BBC_27'
    | 'BBC_28'
    | 'BBC_29'
    | 'BBC_3'
    | 'BBC_30'
    | 'BBC_31'
    | 'BBC_32'
    | 'BBC_33'
    | 'BBC_34'
    | 'BBC_35'
    | 'BBC_36'
    | 'BBC_37'
    | 'BBC_38'
    | 'BBC_39'
    | 'BBC_4'
    | 'BBC_40'
    | 'BBC_41'
    | 'BBC_42'
    | 'BBC_43'
    | 'BBC_44'
    | 'BBC_45'
    | 'BBC_46'
    | 'BBC_47'
    | 'BBC_48'
    | 'BBC_49'
    | 'BBC_5'
    | 'BBC_50'
    | 'BBC_51'
    | 'BBC_52'
    | 'BBC_6'
    | 'BBC_7'
    | 'BBC_8'
    | 'BBC_9'
    | 'BBNH_1'
    | 'BBNH_10'
    | 'BBNH_11'
    | 'BBNH_12'
    | 'BBNH_13'
    | 'BBNH_14'
    | 'BBNH_15'
    | 'BBNH_16'
    | 'BBNH_17'
    | 'BBNH_18'
    | 'BBNH_19'
    | 'BBNH_2'
    | 'BBNH_20'
    | 'BBNH_21'
    | 'BBNH_22'
    | 'BBNH_23'
    | 'BBNH_24'
    | 'BBNH_25'
    | 'BBNH_26'
    | 'BBNH_27'
    | 'BBNH_28'
    | 'BBNH_29'
    | 'BBNH_3'
    | 'BBNH_30'
    | 'BBNH_31'
    | 'BBNH_32'
    | 'BBNH_33'
    | 'BBNH_34'
    | 'BBNH_35'
    | 'BBNH_36'
    | 'BBNH_37'
    | 'BBNH_38'
    | 'BBNH_39'
    | 'BBNH_40'
    | 'BBNH_41'
    | 'BBNH_42'
    | 'BBNH_43'
    | 'BBNH_44'
    | 'BBNH_45'
    | 'BBNH_46'
    | 'BBNH_47'
    | 'BBNH_48'
    | 'BBNH_49'
    | 'BBNH_5'
    | 'BBNH_50'
    | 'BBNH_51'
    | 'BBNH_52'
    | 'BBNH_53'
    | 'BBNH_54'
    | 'BBNH_55'
    | 'BBNH_56'
    | 'BBNH_57'
    | 'BBNH_58'
    | 'BBNH_59'
    | 'BBNH_6'
    | 'BBNH_60'
    | 'BBNH_61'
    | 'BBNH_62'
    | 'BBNH_63'
    | 'BBNH_64'
    | 'BBNH_65'
    | 'BBNH_66'
    | 'BBNH_67'
    | 'BBNH_68'
    | 'BBNH_69'
    | 'BBNH_7'
    | 'BBNH_70'
    | 'BBNH_71'
    | 'BBNH_72'
    | 'BBNH_73'
    | 'BBNH_74'
    | 'BBNH_75'
    | 'BBNH_76'
    | 'BBNH_77'
    | 'BBNH_8'
    | 'BBNH_9'
    | 'BCD_1'
    | 'BCD_10'
    | 'BCD_11'
    | 'BCD_12'
    | 'BCD_13'
    | 'BCD_14'
    | 'BCD_15'
    | 'BCD_16'
    | 'BCD_17'
    | 'BCD_18'
    | 'BCD_19'
    | 'BCD_2'
    | 'BCD_20'
    | 'BCD_21'
    | 'BCD_22'
    | 'BCD_23'
    | 'BCD_24'
    | 'BCD_25'
    | 'BCD_26'
    | 'BCD_27'
    | 'BCD_28'
    | 'BCD_29'
    | 'BCD_3'
    | 'BCD_30'
    | 'BCD_31'
    | 'BCD_32'
    | 'BCD_33'
    | 'BCD_34'
    | 'BCD_35'
    | 'BCD_36'
    | 'BCD_37'
    | 'BCD_39'
    | 'BCD_4'
    | 'BCD_40'
    | 'BCD_41'
    | 'BCD_42'
    | 'BCD_43'
    | 'BCD_44'
    | 'BCD_45'
    | 'BCD_46'
    | 'BCD_47'
    | 'BCD_48'
    | 'BCD_49'
    | 'BCD_5'
    | 'BCD_50'
    | 'BCD_51'
    | 'BCD_52'
    | 'BCD_53'
    | 'BCD_54'
    | 'BCD_55'
    | 'BCD_56'
    | 'BCD_57'
    | 'BCD_58'
    | 'BCD_6'
    | 'BCD_7'
    | 'BCD_8'
    | 'BCD_9'
    | 'BHL_1'
    | 'BHL_10'
    | 'BHL_11'
    | 'BHL_12'
    | 'BHL_13'
    | 'BHL_14'
    | 'BHL_15'
    | 'BHL_16'
    | 'BHL_17'
    | 'BHL_18'
    | 'BHL_19'
    | 'BHL_2'
    | 'BHL_20'
    | 'BHL_21'
    | 'BHL_3'
    | 'BHL_4'
    | 'BHL_5'
    | 'BHL_6'
    | 'BHL_7'
    | 'BHL_8'
    | 'BHL_9'
    | 'BP_1'
    | 'BP_10'
    | 'BP_11'
    | 'BP_2'
    | 'BP_3'
    | 'BP_4'
    | 'BP_5'
    | 'BP_6'
    | 'BP_7'
    | 'BP_8'
    | 'BP_9'
    | 'IMG_0747'
    | 'IMG_0748'
    | 'IMG_0749'
    | 'IMG_0750'
    | 'IMG_0751'
    | 'IMG_0752'
    | 'IMG_1'
    | 'IMG_10'
    | 'IMG_100'
    | 'IMG_1000'
    | 'IMG_1001'
    | 'IMG_101'
    | 'IMG_102'
    | 'IMG_103'
    | 'IMG_104'
    | 'IMG_105'
    | 'IMG_106'
    | 'IMG_107'
    | 'IMG_108'
    | 'IMG_109'
    | 'IMG_11'
    | 'IMG_110'
    | 'IMG_111'
    | 'IMG_112'
    | 'IMG_113'
    | 'IMG_114'
    | 'IMG_115'
    | 'IMG_116'
    | 'IMG_117'
    | 'IMG_118'
    | 'IMG_119'
    | 'IMG_12'
    | 'IMG_120'
    | 'IMG_121'
    | 'IMG_122'
    | 'IMG_123'
    | 'IMG_124'
    | 'IMG_125'
    | 'IMG_126'
    | 'IMG_127'
    | 'IMG_128'
    | 'IMG_129'
    | 'IMG_13'
    | 'IMG_130'
    | 'IMG_131'
    | 'IMG_132'
    | 'IMG_133'
    | 'IMG_134'
    | 'IMG_14'
    | 'IMG_15'
    | 'IMG_16'
    | 'IMG_17'
    | 'IMG_18'
    | 'IMG_19'
    | 'IMG_2'
    | 'IMG_20'
    | 'IMG_21'
    | 'IMG_22'
    | 'IMG_23'
    | 'IMG_24'
    | 'IMG_25'
    | 'IMG_26'
    | 'IMG_27'
    | 'IMG_28'
    | 'IMG_29'
    | 'IMG_3'
    | 'IMG_30'
    | 'IMG_31'
    | 'IMG_32'
    | 'IMG_33'
    | 'IMG_34'
    | 'IMG_35'
    | 'IMG_36'
    | 'IMG_37'
    | 'IMG_38'
    | 'IMG_39'
    | 'IMG_4'
    | 'IMG_40'
    | 'IMG_41'
    | 'IMG_42'
    | 'IMG_43'
    | 'IMG_44'
    | 'IMG_45'
    | 'IMG_46'
    | 'IMG_47'
    | 'IMG_48'
    | 'IMG_5'
    | 'IMG_6'
    | 'IMG_7'
    | 'IMG_8'
    | 'IMG_9'
    | 'backArrow'
    | 'background'
    | 'book'
    | 'brain'
    | 'carWifi'
    | 'check'
    | 'checklist'
    | 'chevronLeft'
    | 'chevronLeftPurple'
    | 'chevronRight'
    | 'chevronRightGray'
    | 'chevronRightPurple'
    | 'close'
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
    | 'warning'
    | 'warningCircle';
}

export default function ImageIcon(props: ImageIconProps): {};
