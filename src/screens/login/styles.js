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
    marginTop: 200,
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
    height: 70,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 20,
    marginBottom: 20
  },
  textoTitulo: {
    color: 'blue',
    justifyContent: 'center'
  }
});

export default styles;
