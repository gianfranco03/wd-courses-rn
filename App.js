import React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';

import {UserContextProvider} from './src/context/userContext';
import RootScreen from './src/screens/root';
import colors from './src/lib/constants/colors';
import {fontsConfig} from './src/lib/constants/typography';

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontsConfig),
  colors: {
    ...DefaultTheme.colors,
    ...colors,
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
