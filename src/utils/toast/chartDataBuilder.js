import {filter_map} from '../../screens/stats';
const lineChartData = {
  labels: ['January'],
  datasets: [
    {
      data: [Math.random() * 100],
    },
  ],
};

const getDate = date => {
  const getDateInfo = date.split('/').reverse();
  const newDate = new Date(getDateInfo[0], getDateInfo[1], getDateInfo[2]);

  return {month: newDate.toLocaleString('default', {month: 'long'}), date};
};

export const getLineCharData = (type, data = []) => {
  let charData = {
    labels: ['June'],
    datasets: [
      {
        data: [Math.random() * 100],
      },
    ],
  };

  if (type == filter_map.course) {
    const getMonthsName = data.map(item => getDate(item.date_added));

    const getMonths = getMonthsName.filter(
      (v, i, a) => a.findIndex(t => t.month === v.month) === i,
    );

    const getLabels = getMonths.map(item => item.month);

    const getData = data.filter(({date: id1}) =>
      getMonths.some(({date: id2}) => id2 !== id1),
    );

    console.log(getData);

    charData = {labels: getLabels, datasets: [{data: [100]}]};
  }
  if (type == filter_map.semester) {
  }

  if (type == filter_map.student) {
  }
  console.log('data', charData);

  return charData;
};

const progressChartData = {
  labels: ['Swim', 'Bike', 'Run'], // optional
  data: [0.4, 0.6, 0.8],
};

const pieCharData = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];
