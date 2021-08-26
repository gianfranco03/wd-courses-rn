import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {Appbar, Title, Subheading} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ListAccordion from '../../components/listAccordion';
import DatePicker from '../../components/datePicker';
import showToast, {TYPES} from '../../utils/toast';

import {supabase} from '../../lib/constants/api';
import {useUser} from '../../context/userContext';
import styles from './styles';

const AttendanceScreen = () => {
  const {colors} = useTheme();
  const backgroundColor = {backgroundColor: colors.appBackground};
  const [courseSelected, setCourseSelected] = useState(null);
  const [sectionSelected, setSectionSelected] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);

  const {user, sections, courses, userInfo} = useUser();

  const onCancel = () => {
    setCourseSelected(null);
    setSectionSelected(null);
  };

  const onSubmit = () => {
    if (!userInfo?.carnet) {
      // no carnet
      showToast({
        text: 'No hemos encontrado un carnet en tu cuenta.',
        type: TYPES.ERROR,
      });
    } else if (!courseSelected?.id) {
      // no course
      showToast({text: 'Selecciona un curso.', type: TYPES.ERROR});
    } else if (!sectionSelected?.id) {
      // no section
      showToast({text: 'Seleccionaa una sección.', type: TYPES.ERROR});
    } else if (!timeSelected) {
      // no time
      showToast({text: 'Selecciona la fecha.', type: TYPES.ERROR});
    } else {
      verifyAttendance();
    }
  };

  const verifyAttendance = async () => {
    let {data: attendance, error} = await supabase
      .from('attendance')
      .select('date_added')
      .eq('profile_id', user.id)
      .eq('section_id', sectionSelected.id)
      .eq('date_added', timeSelected);

    if (
      attendance &&
      attendance.length > 0 &&
      attendance[0].date_added == timeSelected
    ) {
      showToast({
        text: 'La assistencia ya ha sido ingresada anteriormente.',
        type: TYPES.ERROR,
      });
    } else {
      sendAttendance();
    }
  };

  const sendAttendance = async () => {
    try {
      const {data, error} = await supabase.from('attendance').insert([
        {
          profile_id: user.id,
          course_id: courseSelected.id,
          section_id: sectionSelected.id,
          date_added: timeSelected,
          semester_id: userInfo.current_semester,
        },
      ]);
      if (data) {
        showToast({
          text: 'Assitencia ingresada correctamente.',
          type: TYPES.SUCCESS,
        });
      }
      if (error) {
        showToast({text: error.message, type: TYPES.ERROR});
      }
    } catch (e) {
      showToast({
        text: 'Algo salió mal, intenta más tarde.',
        type: TYPES.ERROR,
      });
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, backgroundColor]}>
        <Appbar.Header style={styles.header}>
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
    <View style={[styles.container, backgroundColor]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title="Asitencia"
          subtitle={
            userInfo?.first_name
              ? `${userInfo?.first_name} ${userInfo?.last_name}`
              : 'Juan'
          }
          color="white"
        />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Title>
          Carnet <Subheading>{userInfo?.carnet || '1990-18-20569'}</Subheading>
        </Title>
        <ListAccordion
          title="Curso"
          listTitle={courseSelected?.name || 'Selecciona una opción.'}
          options={
            (courses &&
              courses.length > 0 &&
              courses.map(item => ({id: item.course_id, ...item}))) ||
            []
          }
          onChange={setCourseSelected}
          icon="book-open-page-variant"
        />
        <ListAccordion
          title="Sección"
          listTitle={sectionSelected?.name || 'Selecciona una opción.'}
          options={
            (sections &&
              sections.length > 0 &&
              sections.map(item => ({id: item.section_id, ...item}))) ||
            []
          }
          onChange={setSectionSelected}
          icon="alphabetical-variant"
        />
        <DatePicker
          onPress={setTimeSelected}
          clear={sectionSelected && courseSelected}
        />
        <View style={styles.buttonsContainer}>
          <Button
            icon="check"
            labelStyle={{color: 'white'}}
            mode="contained"
            onPress={onSubmit}>
            Enviar
          </Button>
          <Button icon="cancel" mode="outlined" onPress={onCancel}>
            Cancelar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceScreen;
