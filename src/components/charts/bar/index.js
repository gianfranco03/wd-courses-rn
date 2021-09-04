import React from 'react';
import {View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';

import styles from './styles';

const BarChart = ({data, title}) => {
  return (
    <>
      <>
        {title ? <Title style={styles.titleText}>{title} </Title> : null}
        <VictoryChart domainPadding={25}>
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={data}
            labels={({datum}) => datum.y}
            style={{labels: {fill: 'white', ...styles.labelText}}}
            labelComponent={<VictoryLabel dy={30} />}
          />
        </VictoryChart>
      </>
      <View style={styles.infoContainer}>
        {data.map((course, index) => {
          return (
            <View style={styles.textInfo} key={index}>
              <Text style={styles.courseName}>- {course.x}: </Text>
              <Text>{course.y} estudiantes</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

BarChart.defaultProps = {
  data: [
    {
      x: 1,
      y: 2,
    },
    {
      x: 1,
      y: 2,
    },
    {
      x: 1,
      y: 2,
    },
  ],
};

export default BarChart;
