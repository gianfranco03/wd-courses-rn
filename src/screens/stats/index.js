import React, {useState, useEffect} from 'react';
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
import {supabase} from '../../lib/constants/api';

const STATS_TYPES = {
  PEOPLE: 'PEOPLE',
  COURSES: 'COURSES',
  SECTIONS: 'SECTIONS',
};

function StatsRender(type) {
  const themePaper = useTheme();

  const [peopleData, setPeopleData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [sectionsData, setSectionsData] = useState([
    {x: 'A', y: 1},
    {x: 'B', y: 2},
    {x: 'C', y: 1},
  ]);
  const [courseSelected, setCourseSelected] = useState('Desarrollo Web');
  const [studentsLength, setStudentsLength] = useState(0);

  useEffect(() => {
    getPeopleData();
    getCoursesData();
    getSectionsData();
  }, []);

  const getPeopleData = async () => {
    let {data: students, error} = await supabase
      .from('profiles')
      .select('user_category')
      .eq('user_category', 1);

    let {data: teachers, error2} = await supabase
      .from('profiles')
      .select('user_category')
      .eq('user_category', 2);

    let dataSupabase = [
      {x: 'Alumnos', y: students.length},
      {x: 'Catedraticos', y: teachers.length},
    ];

    setStudentsLength(students.length);
    setPeopleData(dataSupabase);
  };

  const getCoursesData = async () => {
    let {data: courses, error} = await supabase.from('courses').select('name');

    const localCourses = courses.map(course => {
      return {x: course.name, y: Math.floor(Math.random() * studentsLength)};
    });

    setCoursesData(localCourses);
  };

  const getSectionsData = () => {
    let distributeInteger = function* (total, divider) {
      if (divider === 0) {
        yield 0;
      } else {
        let rest = total % divider;
        let result = total / divider;

        for (let i = 0; i < divider; i++) {
          if (rest-- > 0) {
            yield Math.ceil(result);
          } else {
            yield Math.floor(result);
          }
        }
      }
    };

    let sections = [];
    let sectionsLetter = ['A', 'B', 'C', 'D'];

    for (let student of distributeInteger(studentsLength, 4)) {
      sections.push(student);
    }

    const dataSupabase = sections.map((section, index) => {
      return {x: sectionsLetter[index], y: sections[index]};
    });

    setSectionsData(dataSupabase);
  };

  const renderPeopleChart = () => {
    return (
      <ScrollView>
        <Title style={{textAlign: 'center', marginTop: 30}}>Distribucion</Title>
        <VictoryPie
          data={peopleData}
          labelRadius={({innerRadius}) => innerRadius + 50}
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
        <View>
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
        </View>
        <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 30}}>
          {coursesData.map((course, index) => {
            return (
              <View
                style={{flexDirection: 'row', marginVertical: 2}}
                key={index}>
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
          <Title style={{textAlign: 'center', marginTop: 30}}>
            {courseSelected}
          </Title>
          <VictoryPie
            data={sectionsData}
            labelRadius={({innerRadius}) => innerRadius + 60}
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
