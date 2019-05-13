import {
  PixelRatio,
  Dimensions,
} from 'react-native';

export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export const pixelRatio = PixelRatio.get();

export const DEFAULT_DENSITY = 2;
const w2 = 750 / DEFAULT_DENSITY;
const h2 = 1334 / DEFAULT_DENSITY;

export function setSpText(size) {
  const scaleWidth = screenW / w2;
  const scaleHeight = screenH / h2;
  const scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
  return size;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
export function scaleSize(size) {
  const scaleWidth = screenW / w2;
  const scaleHeight = screenH / h2;
  const scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round((size * scale + 0.5));
  return size / DEFAULT_DENSITY;
}
