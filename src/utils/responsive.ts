/** This mixin help us scale UX base on the device's size */
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Based on iPhone XS's scale
const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 812;

export const Horizontalscale = (size: number) => size * widthScale;

export const VerticalScale = (size: number) => size * heightScale;

// Smart horizontal scaling
export const moderateScale = (size: number, factor = 0.5) =>
  size + (Horizontalscale(size) - size) * factor;

// Font scaling
export const scaleFont = (size: number, factor = 0.5) =>
  size + (Horizontalscale(size) - size) * factor;