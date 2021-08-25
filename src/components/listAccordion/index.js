import * as React from 'react';
import {List} from 'react-native-paper';

const ListAccordion = props => {
  const {title, icon, options, onPress} = props;

  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(options[0]?.name || '');

  const handlePress = () => setExpanded(!expanded);

  const handlePressItem = id => {
    const selectedAux = options.find(item => item.id == id);
    setSelected(selectedAux.name);
    handlePress();
    onPress(id);
  };

  return (
    <List.Section title={title}>
      <List.Accordion
        title={selected}
        left={props => <List.Icon {...props} icon={icon} />}
        expanded={expanded}
        onPress={handlePress}>
        {options && options.length > 0
          ? options.map((item, index) => (
              <List.Item
                key={index}
                style={{backgroundColor: 'white'}}
                title={item.name}
                onPress={() => handlePressItem(item.id)}
              />
            ))
          : null}
      </List.Accordion>
    </List.Section>
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
  onPress: () => {},
};

export default ListAccordion;
