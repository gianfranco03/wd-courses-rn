import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {useTheme, Appbar, Title} from 'react-native-paper';
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';

import {Tabs, TabScreen} from 'react-native-paper-tabs';

import styles from './styles';

const STATS_TYPES = {
  PEOPLE: 'PEOPLE',
  COURSES: 'COURSES',
  SECTIONS: 'SECTIONS',
};

function StatsRender(type) {
  const {colors} = useTheme();

  const [peopleData, setPeopleData] = useState([
    {x: 'Alumnos', y: 30},
    {x: 'Catedraticos', y: 40},
  ]);
  const [coursesData, setCoursesData] = useState([
    {y: 30, x: 'Desarrollo Web'},
    {y: 23, x: 'Analisis de Sistemas'},
    {y: 34, x: 'Redes de Computacion'},
    {y: 42, x: 'Etica Profesional'},
  ]);
  const [sectionsData, setSectionsData] = useState([
    {x: 'A', y: 30},
    {x: 'B', y: 32},
    {x: 'C', y: 35},
    {x: 'D', y: 23},
  ]);
  const [courseSelected, setCourseSelected] = useState('Desarrollo Web');

  const renderPeopleChart = () => {
    return (
      <ScrollView>
        <Title style={{textAlign: 'center', marginTop: 30}}>Distribucion</Title>
        <VictoryPie
          data={peopleData}
          labelRadius={({innerRadius}) => innerRadius + 10}
          style={{labels: {fill: 'white', fontSize: 20}}}
          labels={({datum}) => `${datum.x} ${datum.y}`}
        />
      </ScrollView>
    );
  };

  const renderCoursesChart = () => {
    return (
      <ScrollView>
        <Title style={{textAlign: 'center', marginTop: 30}}>
          Alumnos por curso
        </Title>
        <VictoryChart domainPadding={25}>
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={coursesData}
            categories={{
              x: [
                'Desarrollo Web',
                'Analisis de Sistemas',
                'Redes de Computacion',
                'Etica Profesional',
              ],
            }}
            labels={({datum}) => datum.y}
            style={{labels: {fill: 'white'}}}
            labelComponent={<VictoryLabel dy={30} />}
          />
        </VictoryChart>
        <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 30}}>
          {coursesData.map(course => {
            return (
              <View style={{flexDirection: 'row', marginVertical: 2}}>
                <Text style={{fontWeight: 'bold'}}>- {course.x} :</Text>
                <Text>{course.y} estudiantes</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderSectionsChart = () => {
    return (
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Title style={{ textAlign: 'center', marginTop: 30}}>{courseSelected}</Title>
          <VictoryPie
            data={sectionsData}
            labelRadius={({innerRadius}) => innerRadius + 70}
            style={{labels: {fill: 'white', fontSize: 20}}}
            labels={({datum}) => `Seccion ${datum.x}\n ${datum.y}`}
          />
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
        <Appbar.Content title="Stats" color="white" />
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
