import React from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import {VictoryPie} from 'victory-native';

import styles from './styles';

const PieChart = ({title, data}) => {
  return (
    <View>
      {title ? <Title style={styles.titleText}>{title}</Title> : null}
      <VictoryPie
        data={data}
        labelRadius={({innerRadius}) => innerRadius + 50}
        style={{labels: {fill: 'white', ...styles.labelText}}}
        labels={({datum}) => `${datum.x} #${datum.y}`}
      />
    </View>
  );
};

PieChart.defaultProps = {
  data: [
    {x: 'Alumnos', y: 1},
    {x: 'Catedraticos', y: 2},
  ],
};

export default PieChart;
