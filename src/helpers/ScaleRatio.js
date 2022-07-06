import {Dimensions,PixelRatio} from 'react-native';

export const WINDOW_HEIGHT = Dimensions.get("window").height
export const WINDOW_WIDTH = Dimensions.get("window").width


export default function scaleRatio(percent) {
    const heightPercent = (percent * WINDOW_HEIGHT) / 100;
    return Math.round(heightPercent);
  }