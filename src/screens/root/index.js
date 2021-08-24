import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const RootScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text>Hello from root screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default RootScreen;
