import Toast from 'react-native-root-toast';

const COLOR = {
  SUCCESS: '#696969',
  ERROR: '#FF0000'
};

export const TYPES = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const showToast = (options) => {
  Toast.show(options.text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:
      options.type === TYPES.SUCCESS ? COLOR.SUCCESS : options.type === TYPES.ERROR ? COLOR.ERROR : COLOR.SUCCESS
  });
};

export default showToast;