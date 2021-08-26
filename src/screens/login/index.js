import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
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
    <View>

    <Card style={ styles.containerForm }>
    <Card.Title title="Iniciar Sesión" subtitle="Ingrese sus datos" style={ styles.textoTitulo } />
    <Card.Content>

      <TextInput
      style={styles.inputText}
      label="Email"
      value={email}
      placeholder="Ingrese su correo"
      onChangeText={email => setEmail(email)}
      />

      <TextInput
      style={styles.inputText}
      label="Password"
      value={password}
      secureTextEntry={true}
      placeholder="Contraseña"
      onChangeText={password => setPassword(password)}
      />
      
      <Button
      style={ styles.button }
      icon="login"
      mode="contained"
      onPress={() => {
          console.log('Pressed');
          onSignIn();
        }}>
          Iniciar Sesión
      </Button>
    </Card.Content>

    </Card>
    </View>
  );
};

export default LoginScreen;
