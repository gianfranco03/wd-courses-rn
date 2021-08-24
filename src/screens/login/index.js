import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { isEmpty } from "lodash";

import { supabase } from '../../lib/constants/api';
import showToast, { TYPES } from '../../utils/toast';

import styles from './styles';

const LoginScreen = props => {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);

      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

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
      <View>
        <Text>Hello from Login screen</Text>
        <TouchableOpacity
          onPress={() => navigation.replace('Main')}
          style={styles.button}>
          <Text style={styles.buttonText}>Go to Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
