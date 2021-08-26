import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {LineChart, ProgressChart, PieChart} from 'react-native-chart-kit';
import {useTheme, Appbar} from 'react-native-paper';

import ListAccordion from '../../components/listAccordion';

import {supabase} from '../../lib/constants/api';
import {getLineCharData} from '../../utils/toast/chartDataBuilder';
import styles, {containerWidth} from './styles';

const screenWidth = Dimensions.get('window').width - containerWidth;

export const filter_map = {
  course: 'course',
  semester: 'semester',
  student: 'student',
};

export const filters = [
  {id: 1, name: 'Curso'},
  {id: 2, name: 'Ciclo/Semestre'},
  {id: 3, name: 'Estudiante'},
];

const StatsScreen = () => {
  const {colors} = useTheme();
  const backgroundColor = {backgroundColor: colors.appBackground};

  const [filterSelected, setFilter] = useState();
  const [lineCharData, setLineCharData] = useState({
    labels: ['June'],
    datasets: [
      {
        data: [Math.random() * 100],
      },
    ],
  });
  // const [courses, setCourses] = useState();
  // const [semesters, setFilter] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let {data: attendance, error} = await supabase
      .from('attendance')
      .select('*');

    // console.log('attendance', attendance);
    setLineCharData(getLineCharData(filter_map.course, attendance || []));
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Estadísticas" color="white" />
      </Appbar.Header>
      <View style={styles.content}>
        <ListAccordion
          title="Filtros"
          listTitle={filterSelected?.name || 'Selecciona una opción.'}
          options={filters}
          onChange={setFilter}
          // icon="alphabetical-variant"
        />
      </View>
      <ScrollView style={styles.content}>
        <View>
          <Text>Hello from Stats screen</Text>
        </View>
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={lineCharData}
            width={screenWidth} // from react-native
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <ProgressChart
            data={{
              labels: ['Swim', 'Bike', 'Run'], // optional
              data: [0.4, 0.6, 0.8],
            }}
            width={screenWidth}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: '#022173',
              backgroundGradientFrom: '#022173',
              backgroundGradientTo: '#1b3fa0',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            hideLegend={false}
          />
          <PieChart
            data={[
              {
                name: 'Seoul',
                population: 21500000,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Toronto',
                population: 2800000,
                color: '#F00',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Beijing',
                population: 527612,
                color: 'red',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'New York',
                population: 8538000,
                color: '#ffffff',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Moscow',
                population: 11920000,
                color: 'rgb(0, 0, 255)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ]}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10, 50]}
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;
