import React from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import {
  Appbar,
  Title,
  Subheading,
  useTheme,
  Button,
  Headline,
} from 'react-native-paper';

import {supabase} from '../../lib/constants/api';
import showToast, {TYPES} from '../../utils/toast';
import styles from './styles';

const students = [
  {name: 'Cristian Hernádez', id: '1990-18-20568'},
  {name: 'Hans Girón', id: '1990-16-14934'},
  {name: 'Rudy Cancax', id: '1990-16-12707'},
  {name: 'Marco Castro', id: '1990-16-4403'},
  {name: 'Bryan Son', id: '1990-17-13093'},
];

const Divider = () => <View style={styles.divider} />;

const AboutScreen = props => {
  const {navigation} = props;
  const {colors} = useTheme();
  const backgroundColor = {backgroundColor: colors.appBackground};

  const onSignOut = async () => {
    try {
      let {error} = await supabase.auth.signOut();
      if (error) {
        showToast({text: error.message, type: TYPES.ERROR});
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    } catch (e) {
      showToast({
        text: 'Algo salió mal, intente más tarde.',
        type: TYPES.ERROR,
      });
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.stutendItem}>
      <Subheading style={styles.studentName}>{item.name}</Subheading>
      <Subheading style={styles.studentId}>{item.id}</Subheading>
    </View>
  );

  return (
    <View style={[styles.container, backgroundColor]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Acerca de" color="white" />
      </Appbar.Header>
      <View style={styles.body}>
        <Headline style={styles.titleText}>Proyecto 3</Headline>
        <Divider />
        <Subheading>Universidad Mariano Gálvez de Guatemala</Subheading>
        <Subheading>Desarrollo Web - A</Subheading>
        <Subheading>Ing. Pablo Antonio de León Bautista</Subheading>
        <Divider />
        <Title>Integrantes</Title>
        <View>
          <FlatList
            data={students}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.list}
          />
        </View>
        <Button
          style={styles.button}
          icon="logout"
          mode="contained"
          labelStyle={{color: 'white'}}
          onPress={onSignOut}>
          Cerrar Sesión
        </Button>
      </View>
    </View>
  );
};

export default AboutScreen;
