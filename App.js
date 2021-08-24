import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import RootScreen from './src/screens/root';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <RootScreen />
    </PaperProvider>
  );
};

export default App;
