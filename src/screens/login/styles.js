import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerForm: {
    textAlignVertical: 'center',
    marginTop: hp(25),
  },
  button: {
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  buttonText: {
    color: 'white',
  },
  inputText: {
    height: hp(9),
    borderTopRightRadius: hp(3),
    borderTopLeftRadius: hp(3),
    borderRadius: hp(3),
    marginBottom: hp(4)
  },
  textoTitulo: {
    color: 'blue',
    justifyContent: 'center'
  }
});

export default styles;
