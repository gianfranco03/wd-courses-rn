import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StatusBar} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import {isEmpty} from 'lodash';

import {useUser} from '../../context/userContext';
import {supabase} from '../../lib/constants/api';
import showToast, {TYPES} from '../../utils/toast';

import colors from '../../lib/constants/colors';
import styles from './styles';

const LoginScreen = props => {
  const {navigation} = props;
  const {user} = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        RNBootSplash.hide();
      }, 3000);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
      setTimeout(() => {
        RNBootSplash.hide();
      }, 3000);
    }
  }, [user]);

  const onSignIn = async () => {
    if (!isEmpty(email) || !isEmpty(password)) {
      try {
        const {user, error} = await supabase.auth.signIn({email, password});
        if (user) {
          navigation.replace('Main');
        }
        if (error) {
          showToast({text: error.message, type: TYPES.ERROR});
        }
      } catch (e) {
        showToast({
          text: 'Algo salió mal, intente más tarde.',
          type: TYPES.ERROR,
        });
      }
    } else {
      showToast({text: 'Ingrese correo y contraseña.', type: TYPES.SUCCESS});
    }
  };

  const uri =
    'https://images.unsplash.com/photo-1600195077077-7c815f540a3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=636&q=80';

  return (
    <ImageBackground style={styles.container} resizeMode="cover" source={{uri}}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.titleText}>Iniciar Sesión</Text>
      <Text style={styles.subTitleText}>
        Asistencia Universidad Mariano Gálvez de Guatemala
      </Text>
      <View style={styles.inputContainer} s>
        <TextInput
          mode="flat"
          left={<TextInput.Icon name="email" color={colors.primary} />}
          style={styles.inputText}
          label="Email"
          value={email}
          placeholder="Ingrese su correo"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="flat"
          left={<TextInput.Icon name="lock" color={colors.primary} />}
          style={styles.inputText}
          label="Password"
          value={password}
          secureTextEntry={true}
          placeholder="Contraseña"
          onChangeText={password => setPassword(password)}
        />
      </View>
      <Button
        style={styles.button}
        icon="login"
        mode="contained"
        labelStyle={{color: 'white'}}
        onPress={() => {
          onSignIn();
        }}>
        Iniciar Sesión
      </Button>
    </ImageBackground>
  );
};

export default LoginScreen;
