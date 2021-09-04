import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    width: '100%',
    // height: hp(19),
    zIndex: 1,
  },
  item: {
    zIndex: 999,
    position: 'relative',
  },
});

export default styles;
