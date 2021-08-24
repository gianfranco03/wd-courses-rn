import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
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
  React.useEffect(() => {
    setTimeout(() => {
      // Hide splash screen
      RNBootSplash.hide();
    }, 2000);
  }, []);

  return (
    <PaperProvider theme={theme}>
      <RootScreen />
    </PaperProvider>
  );
};

export default App;
