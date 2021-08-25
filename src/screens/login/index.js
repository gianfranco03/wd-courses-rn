import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {  Button, } from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import { isEmpty } from "lodash";

import { useUser } from '../../context/userContext';
import { supabase } from '../../lib/constants/api';
import showToast, { TYPES } from '../../utils/toast';

import styles from './styles';

const LoginScreen = props => {
  const { navigation } = props;
  const { user } = useUser()
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
        routes: [{ name: 'Main' }],
      });
      setTimeout(() => {
        RNBootSplash.hide();
      }, 3000);
    }
  }, [user]);

  const onSignIn = async () => {
    if (!isEmpty(email) || !isEmpty(password)) {
      try {
        const { user, error } = await supabase.auth.signIn({ email, password });
        if (user) {
          navigation.replace('Main');
        }
        if (error) {
          showToast({ text: error.message, type: TYPES.ERROR });
        }
      } catch (e) {
        showToast({ text: 'Algo salió mal, intente más tarde.', type: TYPES.ERROR });
      }
    } else {
      showToast({ text: 'Ingrese correo y contraseña.', type: TYPES.SUCCESS });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
           style={{height: 40}}
        label="Email"
        value={email}
        placeholder="Email"
        onChangeText={email => {setEmail(email)}}
      />

      <TextInput 
      style={{height: 40}}
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={password => {setPassword(password); console.log(password);}}
      />

      <Button icon="camera" mode="contained" onPress={() => {console.log('Pressed'); onSignIn()}}>
          Ingresar
      </Button>
 


    </View>
  );
};

export default LoginScreen;
