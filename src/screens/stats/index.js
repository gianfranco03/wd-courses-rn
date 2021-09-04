import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useTheme, Appbar} from 'react-native-paper';

import {Tabs, TabScreen} from 'react-native-paper-tabs';

import ListAccordion from '../../components/listAccordion';
import PieChart from '../../components/charts/pie';
import BarChart from '../../components/charts/bar';

import styles from './styles';
import {supabase} from '../../lib/constants/api';
import {
  getCourseDataChart,
  getSectionChartData,
} from '../../supabase/chartsData';

const STATS_TYPES = {
  PEOPLE: 'PEOPLE',
  COURSES: 'COURSES',
  SECTIONS: 'SECTIONS',
};

function StatsRender(type) {
  const [peopleData, setPeopleData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);
  const [courseSelected, setCourseSelected] = useState({
    course_id: 1,
    name: 'Desarrollo Web',
  });

  useEffect(() => {
    getPeopleData();
    getCoursesData();
    getSectionsData();
  }, []);

  const getPeopleData = async () => {
    let {data: students} = await supabase
      .from('profiles')
      .select('user_category')
      .eq('user_category', 1);

    let {data: teachers} = await supabase
      .from('profiles')
      .select('user_category')
      .eq('user_category', 2);

    let dataSupabase = [
      {x: 'Alumnos', y: students.length},
      {x: 'Catedraticos', y: teachers.length},
    ];

    setPeopleData(dataSupabase);
  };

  const getCoursesData = async () => {
    const localCourses = await getCourseDataChart();
    setCoursesData(localCourses);
  };

  const getSectionsData = async () => {
    const sectionData = await getSectionChartData();
    setSectionsData(sectionData);
    setCourseSelected(sectionData[0]);
  };

  const handleSections = selected => {
    const sectionsAux = [...sectionsData];

    const newSection = sectionsAux.filter(
      item => item.course.course_id === selected.id,
    );

    setCourseSelected(newSection[0]);
  };

  const renderPeopleChart = () => {
    return (
      <ScrollView>
        <PieChart data={peopleData} title="# Personas" />
      </ScrollView>
    );
  };

  const renderCoursesChart = () => {
    return (
      <ScrollView style={styles.content}>
        <BarChart data={coursesData} title="Alumnos por curso" />
      </ScrollView>
    );
  };

  const renderSectionsChart = () => {
    return (
      <ScrollView style={styles.content}>
        <ListAccordion
          title="Curso"
          listTitle={courseSelected?.course?.name || 'Selecciona una opción.'}
          options={
            (sectionsData &&
              sectionsData.length > 0 &&
              sectionsData.map(item => ({
                id: item.course.course_id,
                name: item.course.name,
              }))) ||
            []
          }
          onChange={handleSections}
          icon="book-open-page-variant"
        />
        <View style={styles.sectionsChart}>
          <PieChart data={(courseSelected && courseSelected.sections) || []} />
        </View>
      </ScrollView>
    );
  };

  const renderCharts = () => {
    switch (type.type) {
      case STATS_TYPES.PEOPLE:
        return renderPeopleChart();
      case STATS_TYPES.COURSES:
        return renderCoursesChart();
      case STATS_TYPES.SECTIONS:
        return renderSectionsChart();
      default:
        return <Text>The chart is undefined</Text>;
    }
  };

  return renderCharts();
}

const StatsScreen = () => {
  const {colors} = useTheme();
  const backgroundColor = {backgroundColor: colors.appBackground};

  return (
    <View style={[styles.container, backgroundColor]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Estadísticas" color="white" />
      </Appbar.Header>
      <Tabs>
        <TabScreen label="Personas" icon="account-multiple-outline">
          <StatsRender type={STATS_TYPES.PEOPLE} />
        </TabScreen>
        <TabScreen label="Cursos" icon="apps">
          <StatsRender type={STATS_TYPES.COURSES} />
        </TabScreen>
        <TabScreen label="Secciones" icon="ab-testing">
          <StatsRender type={STATS_TYPES.SECTIONS} />
        </TabScreen>
      </Tabs>
    </View>
  );
};

export default StatsScreen;
