import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';

import styles from './styles';

const ListAccordion = props => {
  const {title, icon, options, onChange, listTitle} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handlePressItem = id => {
    const selectedAux = options.find(item => item.id == id);
    handlePress();
    onChange(selectedAux);
  };

  return (
    <View style={styles.container}>
      <List.Section title={title}>
        <List.Accordion
          title={listTitle}
          left={props => <List.Icon {...props} icon={icon} />}
          expanded={expanded}
          onPress={handlePress}>
          {options && options.length > 0
            ? options.map((item, index) => (
                <List.Item
                  key={index}
                  style={styles.item}
                  title={item.name}
                  onPress={() => handlePressItem(item.id)}
                />
              ))
            : null}
        </List.Accordion>
      </List.Section>
    </View>
  );
};

ListAccordion.defaultProps = {
  title: 'List Accordion',
  icon: 'folder',
  selected: 'any',
  options: [
    {name: 'First item', id: 1},
    {name: 'Second item', id: 2},
  ],
  onChange: () => {},
  listTitle: 'Selecciona una opción',
};

export default ListAccordion;
