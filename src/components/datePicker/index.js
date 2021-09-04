import React, {useState, useEffect} from 'react';
import {View, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

const isIOS = Platform.OS === 'ios';

const DatePicker = props => {
  const {onPress, clear, disabled} = props;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    onPress(dateFormat(date));
  }, []);

  useEffect(() => {
    if (!clear) {
      setDate(new Date());
    }
  }, [clear]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(isIOS);
    setDate(currentDate);
    onPress(dateFormat(currentDate));
  };

  const dateFormat = dateInfo => {
    const month = dateInfo.getUTCMonth() + 1;
    const day = dateInfo.getUTCDate() - 1;
    const year = dateInfo.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const handlePress = () => {
    setShow(true);
    if (isIOS && show) {
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display={isIOS ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
      <Button
        icon="calendar"
        mode="contained"
        disabled={disabled}
        labelStyle={{color: 'white'}}
        onPress={() => handlePress()}>
        {`${isIOS ? (show ? 'Aceptar' : 'Fecha') : 'Fecha'} ${dateFormat(
          date,
        )}`}
      </Button>
    </View>
  );
};

DatePicker.defaultProps = {
  onPress: () => {},
  clear: new Date(),
  disabled: false,
};

export default DatePicker;
