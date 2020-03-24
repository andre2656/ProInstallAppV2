import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="dark" />
      <SafeAreaView style={{ backgroundColor: '#CCCCCC', height: '100%' }}>
        {/* Header Photos With Styling Included */}
        <View style={{ backgroundColor: '#CCCCCC', flexDirection: 'row', paddingTop: 15, width: '100%', height: 50 }}>
          <View style={{ width: '15%', paddingLeft: '5%' }}>
            <Image style={{ width: 30, height: 30, marginLeft: 10 }} source={require('./assets/images/welcome.png')} />
          </View>
          <View style={{ marginTop: 5, width: '50%', paddingLeft: '5%' }}>
            <Image style={{ width: 200, height: 25, marginLeft: 10, }} source={require('./assets/images/logo.png')} />
          </View>
          <View style={{ width: '40%', paddingLeft: '10%', height: 55 }}></View>
        </View>
        {/* Header Styling */}
        <View style={{ width: '100%', flexDirection: 'row', }}>
          <View style={{ width: '25%', height: 15, backgroundColor: '#00c387', }}></View>
          <View style={{ width: '25%', height: 15, backgroundColor: '#00ace3', }}></View>
          <View style={{ width: '25%', height: 15, backgroundColor: '#fe4444', }}></View>
          <View style={{ width: '25%', height: 15, backgroundColor: '#ff8802', }}></View>
        </View>


        {/* Footer Styling */}
        <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0 }}>
          <View style={{ width: '25%', height: 20, backgroundColor: '#ff8802', }}></View>
          <View style={{ width: '25%', height: 20, backgroundColor: '#fe4444', }}></View>
          <View style={{ width: '25%', height: 20, backgroundColor: '#00ace3', }}></View>
          <View style={{ width: '25%', height: 20, backgroundColor: '#00c387', }}></View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
