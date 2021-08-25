const fontFamily = 'Poppins';
const fontWeight = 'normal';

const paperFontsConfig = {
  regular: {
    fontFamily: `${fontFamily}`,
    fontWeight,
  },
  medium: {
    fontFamily: `${fontFamily}-Medium`,
    fontWeight,
  },
  light: {
    fontFamily: `${fontFamily}-Light`,
    fontWeight,
  },
  thin: {
    fontFamily: `${fontFamily}-Thin`,
    fontWeight,
  },
};

export const fontsConfig = {
  web: paperFontsConfig,
  ios: paperFontsConfig,
  android: paperFontsConfig,
};
