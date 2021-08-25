import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {Appbar, Title, Subheading, Headline} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ListAccordion from '../../components/listAccordion';
import DatePicker from '../../components/datePicker';

import {supabase} from '../../lib/constants/api';
import {useUser} from '../../context/userContext';
import colors from '../../lib/constants/colors';
import styles from './styles';

const AttendanceScreen = () => {
  const {user, sections, courses, userInfo} = useUser();

  if (!user) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Assitencia" color="white" />
        </Appbar.Header>
        <View style={styles.emptyContainer}>
          <Title>Algo salió mal, intenta después.</Title>
          <Icon
            name="warning-outline"
            size={70}
            color={colors.primary}
            style={styles.alertIcon}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title="Assitencia"
          subtitle={userInfo?.first_name || 'Juan'}
          color="white"
        />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Title>
          Carnet <Subheading>{userInfo?.carnet || '1990-18-20569'}</Subheading>
        </Title>
        <ListAccordion
          title="Curso"
          options={[]}
          icon="book-open-page-variant"
        />
        <ListAccordion
          title="Sección"
          icon="alphabetical-variant"
          options={
            (sections &&
              sections.length > 0 &&
              sections.map(item => ({id: item.section_id, ...item}))) ||
            []
          }
        />
        <DatePicker />
        <View style={styles.buttonsContainer}>
          <Button
            icon="check"
            labelStyle={{color: 'white'}}
            mode="contained"
            onPress={() => {}}>
            Enviar
          </Button>
          <Button icon="cancel" mode="outlined" onPress={() => {}}>
            Cancelar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceScreen;
