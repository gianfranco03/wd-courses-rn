import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import RootScreen from './src/screens/root';

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      // Hide splash screen
      RNBootSplash.hide();
    }, 2000);
  }, []);

  return <RootScreen />;
};

export default App;
