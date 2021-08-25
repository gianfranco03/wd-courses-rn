import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

import {UserContextProvider} from './src/context/userContext';
import RootScreen from './src/screens/root';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
    text: 'black',
  },
};

const App = () => {
  return (
    <UserContextProvider>
      <PaperProvider theme={theme}>
        <RootScreen />
      </PaperProvider>
    </UserContextProvider>
  );
};

export default App;
